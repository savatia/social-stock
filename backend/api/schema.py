import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import twitterscraper as ts
import datetime as dt
from .TweetClassifier import TweetClassifier

from .models import *

class Tweet(graphene.ObjectType):
	id = graphene.String()
	text = graphene.String()
	date = graphene.String()
	fullname = graphene.String()
	replies = graphene.Int()
	likes = graphene.Int()
	retweets = graphene.Int()
	url = graphene.String()
	user = graphene.String()
	sentiment = graphene.String()

	@staticmethod
	def parse(tweet):
		graphql_tweet = Tweet()
		graphql_tweet.text = tweet.text
		graphql_tweet.date = tweet.timestamp.date()
		graphql_tweet.fullname = tweet.fullname
		graphql_tweet.replies = tweet.replies
		graphql_tweet.likes = tweet.likes
		graphql_tweet.retweets = tweet.retweets
		graphql_tweet.url = tweet.url
		graphql_tweet.user = tweet.user
		graphql_tweet.id = tweet.id
		return graphql_tweet



class SubSectorNode(DjangoObjectType):
	class Meta:
		model = SubSector
		filter_fields = {
			'name': ['exact', 'icontains', 'istartswith'],
		}

		interfaces = (relay.Node, )

class StockNode(DjangoObjectType):
	class Meta:
		model = Stock
		filter_fields = {
			'date': ['exact']
		}

		interfaces = (relay.Node, )


class SentimentNode(DjangoObjectType):
	class Meta:
		model = Sentiment
		filter_fields = {
			'date': ['exact'],
			'company': ['exact']
		}

		interfaces = (relay.Node, )


class CompanyNode(DjangoObjectType):
	stocks = DjangoFilterConnectionField(StockNode)
	sentiments = DjangoFilterConnectionField(SentimentNode)

	class Meta:
		model = Company
		filter_fields = {
			'name': ['exact', 'icontains', 'istartswith'],
			'symbol': ['exact', 'icontains', 'istartswith'],
			'country': ['exact', 'icontains', 'istartswith'],
			'published': ['exact'],
		}
		interfaces = (relay.Node,)

	def resolve_stocks(self, info, **kwargs):
		return Stock.objects.filter(company=self)

	def resolve_sentiments(self, info, **kwargs):
		return Sentiment.objects.filter(company=self)




class Viewer(graphene.ObjectType):
	company = graphene.Field(CompanyNode, id=graphene.Int(), symbol=graphene.String())
	companies = DjangoFilterConnectionField(CompanyNode)

	sub_sector = relay.Node.Field(SubSectorNode)
	sub_sectors = DjangoFilterConnectionField(SubSectorNode)

	sentiment = graphene.Field(SentimentNode, symbol=graphene.String(), date=graphene.String())

	def resolve_companies(self, info, **kwargs):
		return Company.objects.all()

	def resolve_sub_sectors(self, info, **kwargs):
		return SubSector.objects.all()

	def resolve_company(self, info, **kwargs):
		id = kwargs.get('id')
		symbol = kwargs.get('symbol')

		if id is not None:
			return Company.objects.get(pk=id)

		if symbol is not None:
			return Company.objects.get(symbol=symbol)

		return None

	def resolve_sentiment(self, info, **kwargs):
		date = kwargs.get('date')
		symbol = kwargs.get('symbol')
		company = Company.objects.get(symbol=symbol)
		if date is not None and symbol is not None:
			return Sentiment.objects.get(date=date, company=company)
		return None



class Query(Viewer):
	viewer = graphene.Field(Viewer)

	tweets = graphene.List(Tweet, date=graphene.String(), symbol=graphene.String())

	def resolve_viewer(self, info, **kwargs):
		return Query()

	def resolve_tweets(self, info, **kwargs):
		date = kwargs.get('date')
		symbol = kwargs.get('symbol')
		if date is not None and symbol is not None:

			start_date = dt.datetime.strptime(date, '%Y-%m-%d')
			end_date = start_date + dt.timedelta(days=1)
			company = Company.objects.get(symbol=symbol)

			start_date = start_date.date()
			end_date = end_date.date()

			tweets = ts.query_tweets(lang='en', query=' OR '.join(company.search_terms.split()) ,limit=20, begindate=start_date, enddate=end_date)
			tweets =  [Tweet.parse(x) for x in tweets]

			tweet_clf = TweetClassifier()
			for tweet in tweets:
				tweet.sentiment = tweet_clf.get_sentiment(tweet.text)
			return tweets
		return None