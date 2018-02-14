from django.db import models


class SubSector(models.Model):
	name = models.CharField(max_length=50)

	def __str__(self):
		return self.name

# Create your models here.
class Company(models.Model):
	name = models.CharField(max_length=30)
	symbol = models.CharField(max_length=5)
	market_cap = models.IntegerField(null=True, blank=True)
	country = models.CharField(max_length=50, null=True, blank=True)
	year = models.IntegerField(null=True, blank=True)
	sub_sector = models.ForeignKey(SubSector, on_delete=models.DO_NOTHING)
	search_terms = models.CharField(max_length=1000, null=True)
	published = models.BooleanField(default=False)
	def __str__(self):
		return self.name

class Stock(models.Model):
	company = models.ForeignKey(Company, on_delete=models.CASCADE)
	date = models.DateField()
	open = models.DecimalField( max_digits=15, decimal_places=10)
	high = models.DecimalField( max_digits=15, decimal_places=10)
	low = models.DecimalField( max_digits=15, decimal_places=10)
	close = models.DecimalField( max_digits=15, decimal_places=10)
	adj_close = models.DecimalField( max_digits=15, decimal_places=10)
	prediction = models.DecimalField(max_digits=15, decimal_places=10, null=True)
	volume = models.IntegerField()
	moving_average = models.DecimalField(max_digits=15, decimal_places=10, null=True)

	class Meta:
		unique_together = (('company', 'date'),)

	def __str__(self):
		return '{}: {}'.format(self.company.name, self.date.strftime('%Y-%m-%d'))

class Sentiment(models.Model):
	company = models.ForeignKey(Company, on_delete=models.CASCADE)
	date = models.DateField()
	tweet_sentiment = models.DecimalField( max_digits=9, decimal_places=2)
	tweet_volume = models.IntegerField()
	retweet_volume = models.IntegerField()
	retweet_sentiment = models.DecimalField( max_digits=9, decimal_places=2)
	favorite_sentiment = models.DecimalField( max_digits=9, decimal_places=2)
	favorite_volume = models.IntegerField()

	class Meta:
		unique_together = (('company', 'date'),)

	def __str__(self):
		return '{}: {}'.format(self.company.name, self.date.strftime('%Y-%m-%d'))
