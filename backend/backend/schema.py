import graphene
from api.schema import Query


# https://github.com/graphql-python/graphene/issues/478#issuecomment-305947413
schema = graphene.Schema(query=Query, types=[Query])