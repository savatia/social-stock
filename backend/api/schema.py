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


class CompanyNode(DjangoObjectType):
	class Meta:
		model = Company
		filter_fields = {
			'name': ['exact', 'icontains', 'istartswith'],
			'symbol': ['exact', 'icontains', 'istartswith'],
			'country': ['exact', 'icontains', 'istartswith'],
		}
		interfaces = (relay.Node,)


class Viewer(graphene.ObjectType):
	company = graphene.Field(CompanyNode, id=graphene.Int(), symbol=graphene.String())
	companies = DjangoFilterConnectionField(CompanyNode)

	sub_sector = relay.Node.Field(SubSectorNode)
	sub_sectors = DjangoFilterConnectionField(SubSectorNode)

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



class Query(Viewer):
	viewer = graphene.Field(Viewer)
	def resolve_viewer(self, info, **kwargs):
		return Query()