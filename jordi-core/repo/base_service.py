from abc import ABC


class BaseService(ABC):
    def __init__(self, service_url: str):
        self._service_url: str = service_url
        self.__CONTENT_TYPE_HEADER: str = 'Content-Type'
        self.__AUTHORIZATION_HEADER: str = 'Authorization'
        self.__RID_HEADER: str = 'X-Request-Id'
        self.__SPOTINST_ACCOUNT_ID_PARAM: str = 'spotinstAccountId'

    def build_default_query_params(self, account_id: str | None, region: str | None = None) -> dict[str, str | int]:
        """
        :return: default query parameters to add to an API request
        """
        ret_val: dict[str, str] = {}

        if account_id is not None:
            ret_val[self.__SPOTINST_ACCOUNT_ID_PARAM] = account_id

        if region is not None:
            ret_val["region"] = region

        return ret_val

    def build_headers_with_org_token(self, token: str) -> dict[str, str | None]:
        """
        :return: The headers to attached to an API request that will contain the Spot Organization's Token
        """

        ret_val: dict[str, str | None] = {
            self.__CONTENT_TYPE_HEADER: "application/json",
            self.__AUTHORIZATION_HEADER: f"Bearer {token}",
        }

        return ret_val

