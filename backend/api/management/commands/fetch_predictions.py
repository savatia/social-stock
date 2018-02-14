from optparse import make_option

from django.core.management.base import BaseCommand
import pandas as pd
import django

from ...models import Stock, Company


class Command(BaseCommand):
	help = "Whatever you want to print here"

	def add_arguments(self, parser):
		parser.add_argument('--file')
		parser.add_argument('--security')

	def get_predictions(self, file_path, security):
		company = Company.objects.get(symbol=security)
		predictions_df = pd.read_csv(file_path)
		for index, item in predictions_df.iterrows():
			try:
				Stock.objects.update_or_create(
					company=company,
					date=item.Date,
					defaults={
						"moving_average": item.MA,
						"prediction": item.Prediction
					}

				)
			except django.db.utils.IntegrityError as ie:
				print(str(ie))
				pass

	def handle(self, *args, **options):
		file_path = options['file']
		security = options['security']
		print(file_path)
		print(security)
		self.get_predictions(file_path, security)
