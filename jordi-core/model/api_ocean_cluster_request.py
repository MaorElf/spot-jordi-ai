from dataclasses import dataclass
from dataclasses_json import dataclass_json, LetterCase, Undefined

from model.api_ocean_cluster import ApiOceanCluster


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass(frozen=False)
class ApiOceanClusterRequest:
    cluster: ApiOceanCluster = None