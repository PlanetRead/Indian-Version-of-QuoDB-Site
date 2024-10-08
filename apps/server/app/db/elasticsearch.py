from elasticsearch import AsyncElasticsearch
from time import sleep
from .indexes.quote_index import quote_index_mapping


class ElasticsearchClient:
    client = None

    @classmethod
    async def get_instance(self):
        if self.client is None:
            while True:
                try:
                    self.client = AsyncElasticsearch("http://elasticsearch:9200")
                    await self.client.info()
                    print("Connected to Elasticsearch!")
                    break
                except Exception as e:
                    print("Failed to connect to Elasticsearch:", e)
                    sleep(1)
        return self.client

    @classmethod
    async def create_index(self):
        es_client = await self.get_instance()
        if not await es_client.indices.exists(index="quotes"):
            await es_client.indices.create(
                index="quotes", mappings=quote_index_mapping["mappings"]
            )
            print("Index created.")
        else:
            print("Index present. Skipping...")

    @classmethod
    async def insert_quote(self, quote):
        es_client = await self.get_instance()
        response=await es_client.index(index="quotes", document=quote)
        return response
    
    @classmethod
    async def insert_quotes_bulk(self, quotes):
        es_client = await self.get_instance()
        operations = []
        for quote in quotes:
            operations.append({"index": {"_index": "quotes"}})
            operations.append(quote)
        response = await es_client.bulk(operations=operations)
        return response
    
    @classmethod
    async def get_quotes(self):
        es_client = await self.get_instance()
        res = await es_client.search(index="quotes",
            body={
                "query": {"match_all": {}},
                "_source": {
                    "excludes": ["QuoteVector"]
                }
            })
        return res['hits']['hits']

    
    @classmethod
    async def get_quote(self,queryVector):
        es_client = await self.get_instance()
        response = await es_client.search(
            index="quotes",
            body={
                "size": 5,
                "query": {
                    "script_score": {
                        "query": {"match_all": {}},
                        "script": {
                            "source": "cosineSimilarity(params.queryVector, 'QuoteVector') + 1.0",
                            "params": {"queryVector": queryVector}
                        }
                    }
                },
                "_source": {
                    "excludes": ["QuoteVector"] 
                }
            }
        )
        return response['hits']['hits']