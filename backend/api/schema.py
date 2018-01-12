import graphene
from graphene_django.types import DjangoObjectType
from .models import *

class SubSectorType(DjangoObjectType):
	class Meta:
		model = SubSector


class CompanyType(DjangoObjectType):
	class Meta:
		model = Company


class Query(object):
	companies = graphene.List(CompanyType)
	sub_sectors = graphene.List(SubSectorType)

	def resolve_companies(self, info, **kwargs):
		return Company.objects.all()

	def resolve_sub_sectors(self, info, **kwargs):
		return SubSector.objects.all()