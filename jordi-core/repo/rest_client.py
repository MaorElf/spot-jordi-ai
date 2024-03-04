import json
import logging

import requests

logging.basicConfig(level=logging.DEBUG)


class RestClient:

    @staticmethod
    def send_get(url: str, headers: dict, query_params: dict = None, timeout: int = None) -> list[dict]:
        """
        Perform a GET request. We assume that the response format is like Spot's API guidelines
        :param url: The url to GET from
        :param headers: The headers to attach to the request
        :param query_params: The query parameters to insert in the API request
        :param timeout: The number of seconds to wait for before marking request as timeout
        :return: The response
        """
        ret_val: list[dict]
        response = requests.get(url, params=query_params, headers=headers, timeout=timeout)

        response.raise_for_status()

        data: dict = json.loads(response.content.decode('UTF-8'))
        ret_val = data['response']['items']

        return ret_val

    @staticmethod
    def send_post(
            url: str, headers: dict, query_params: dict = None, body: dict = None, timeout: int = None
    ) -> list[dict]:
        """
        Perform a POST request. We assume that the response format is like Spot's API guidelines
        :param url: The url to GET from
        :param headers: The headers to attach to the request
        :param query_params: The query parameters to insert in the API request
        :param body: The body to attach to the request
        :param timeout: The number of seconds to wait for before marking request as timeout
        :return: The response
        """
        ret_val: list[dict]
        response = requests.post(url, params=query_params, headers=headers, data=body, timeout=timeout)

        response.raise_for_status()

        data: dict = json.loads(response.content.decode('UTF-8'))
        ret_val = data['response']

        return ret_val

    @staticmethod
    def send_put(
            url: str, headers: dict, query_params: dict = None, body: dict = None, timeout: int = None
    ) -> list[dict]:
        """
        Perform a POST request. We assume that the response format is like Spot's API guidelines
        :param url: The url to GET from
        :param headers: The headers to attach to the request
        :param query_params: The query parameters to insert in the API request
        :param body: The body to attach to the request
        :param timeout: The number of seconds to wait for before marking request as timeout
        :return: The response
        """
        ret_val: list[dict]
        response = requests.put(url, params=query_params, headers=headers, data=body, timeout=timeout)
        print(response)
        response.raise_for_status()

        data: dict = json.loads(response.content.decode('UTF-8'))
        ret_val = data['response']
        print(ret_val)

        return ret_val

    @staticmethod
    def send_post_return_items(
            url: str, headers: dict, query_params: dict = None, body: dict = None, timeout: int = None
    ) -> list[dict]:
        return RestClient.send_post(url, headers, query_params, body, timeout)['items']
