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

	def __str__(self):
		return self.name