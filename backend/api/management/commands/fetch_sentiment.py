from optparse import make_option

from django.core.management.base import BaseCommand
import pandas as pd
import django

from ...models import Sentiment, Company

class Command(BaseCommand):
	help = "Whatever you want to print here"

	def add_arguments(self, parser):
		parser.add_argument('--file')
		parser.add_argument('--security')


	def get_sentiments(self, file_path, security):
		company = Company.objects.get(symbol=security)
		sentiments_df = pd.read_csv(file_path)
		for index, item in sentiments_df.iterrows():
			try:
				Sentiment.objects.update_or_create(
					company=company,
					date=item.Date,
					tweet_sentiment=item.TweetSentiment,
					tweet_volume=item.TweetVolume,
					retweet_volume=item.RTVolume,
					retweet_sentiment=item.RTSentiment,
					favorite_sentiment=item.LikeSentiment,
					favorite_volume=item.LikeVolume
				)
			except django.db.utils.IntegrityError:
				pass

	def handle(self, *args, **options):
		file_path = options['file']
		security = options['security']
		print(file_path)
		print(security)
		self.get_sentiments(file_path, security)