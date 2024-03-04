import logging
import os
import requests
from flask import request

from model.api_ocean_cluster_request import ApiOceanClusterRequest
from repo.base_service import BaseService
from repo.rest_client import RestClient

logging.basicConfig(level=logging.DEBUG)


class ApiRepository:

    __instance = None
    API_HOST_DEV = 'https://optimizer.dev.spotinst.com'
    API_HOST_PROD = 'https://api.spotinst.io'
    __CONTENT_TYPE_HEADER: str = 'Content-Type'
    __AUTHORIZATION_HEADER: str = 'Authorization'
    __SPOTINST_ACCOUNT_ID_PARAM: str = 'spotinstAccountId'
    __ACCOUNT_ID_PARAM: str = 'accountId'

    service = BaseService(service_url=API_HOST_PROD)

    url = f'{API_HOST_DEV}'
    logging.info(f'URL is: {url}')

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super(ApiRepository, cls).__new__(cls)
            return cls.__instance
        else:
            return cls.__instanc

    def update_ocean_cluster(self, ocean_cluster_id, ocean_cluster):
        ret_val = []
        try:
            api_ocean_cluster_request = ApiOceanClusterRequest(cluster=ocean_cluster)
            url = f"{self.API_HOST_PROD}/ocean/aws/k8s/cluster/{ocean_cluster_id}" #todo maor - change to prod
            headers: dict[str, str | None] = self.build_headers_with_org_token()
            query_params: dict[str, str | int] = self.build_default_query_params()
            json_body = api_ocean_cluster_request.to_json()
            items: list[dict] = RestClient.send_put(url=url, headers=headers, query_params=query_params,
                                                    body=json_body, timeout=40)['items']

            if items is not None:
                ret_val = items[0]
        except Exception as e:
            logging.error(f'Failed to update ocean cluster {ocean_cluster_id}. Error: {e}')

        return ret_val

    def __send_get_request(self, url, params):
        response = requests.get(url, params=params, timeout=120)
        response.raise_for_status()
        return response

    def __send_post_request(self, url, params, headers):
        response = requests.post(url, params=params, timeout=120)
        response.raise_for_status()
        return response


    def build_headers_with_org_token(self) -> dict[str, str | None]:
        """
        :return: The headers to attached to an API request that will contain the Spot Organization's Token
        """
        token: str | None = None
        # get token from Authorization header from request
        authorization_value = request.headers.get(self.__AUTHORIZATION_HEADER)

        ret_val: dict[str, str | None] = {
            self.__CONTENT_TYPE_HEADER: "application/json",
            self.__AUTHORIZATION_HEADER: authorization_value,
            'Host': 'api-private.dev.spotinst.com',
            'Accept': 'application/json',
        }

        return ret_val


    def build_default_query_params(self) -> dict[str, str | int]:
        """
        :return: default query parameters to add to an API request
        """
        ret_val: dict[str, str] = {}
        account_id: str | None = request.args.get(self.__ACCOUNT_ID_PARAM)

        if account_id is not None:
            ret_val[self.__ACCOUNT_ID_PARAM] = account_id

        return ret_val
