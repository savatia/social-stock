from django.core.management.base import BaseCommand
import pandas as pd
import numpy as np
import datetime as dt
import django
import sys
import os

from ...models import Stock, Company

import pandas_datareader.data as web


class Command(BaseCommand):
	help = "Whatever you want to print here"

	# option_list = NoArgsCommand.option_list + (
	#     # make_option('--verbose', action='store_true'),
	# )
	def get_yahoo_data(self, security, start=dt.datetime(2010, 5, 20), end=dt.datetime.now()):
		company = Company.objects.get(symbol=security)
		last_date = None

		delta = end - start  # timedelta

		for i in range(delta.days):
			date = start + dt.timedelta(days=i)

			try:
				Stock.objects.get(company=company, date=date)
			except:
				last_date = date
				break



		if last_date is None:
			return

		df = web.DataReader(security, 'google', last_date, dt.date.today())

		for item in df.iterrows():
			# date_dfd = dt.datetime.strptime(it)
			# print(item)
			date = item[0].date()
			item = item[1]
			Stock.objects.update_or_create(
				company=company,
				date=date,
				open=item.Open,
				high=item.High,
				low=item.Low,
				close=item.Close,
				adj_close=item.Close,
				volume=item.Volume
			)

	def handle(self, *args, **options):

		securities = [
			# 'MSFT',
			# 'GOOG',
			'AAPL'
		]
		for security in securities:
			self.get_yahoo_data(security)
