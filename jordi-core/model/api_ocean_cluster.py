from dataclasses import dataclass
from dataclasses_json import dataclass_json, LetterCase, Undefined

from model.api_auto_scale import ApiOceanAutoScale
from model.api_ocean_strategy import ApiOceanStrategy


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass(frozen=False)
class ApiOceanCluster:
    # id: str = None
    autoScaler: ApiOceanAutoScale = None
    # strategy: ApiOceanStrategy = None
