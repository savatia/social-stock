from importlib import import_module

import graphene
from graphene import relay
from graphene.types import ObjectType
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import *

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
	def resolve_viewer(self, info, **kwargs):
		return Query()