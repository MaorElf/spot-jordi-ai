from apply_request import ApplyRequest

import logging

from model.api_auto_scale import ApiOceanAutoScale
from model.api_ocean_cluster import ApiOceanCluster
from repo.api_repository import ApiRepository

logging.basicConfig(level=logging.INFO)



class FeaturesHandler:

    FEATURES = ["right_sizing", "auto_scaler", "auto_headroom", "manual_headroom", "hybrid_headroom",
                "auto_update_ami", "double_ami", "shutdown_hours", "utilize_commitments", "application_persistency",
                "utilize_commitments", "beanstalk", "emr", "stateful_node",
                "ecs", "scaling_policy"]

    def __init__(self):
        super().__init__()
        self.api_repository = ApiRepository()

    def apply(self, request: ApplyRequest):
        feature_name = request.featureName

        if feature_name not in self.FEATURES:
            return f"Feature {feature_name} not found", 400

        if feature_name == 'auto_scaler':
            ret_val = self.apply_autoscaler(request)

        return ret_val

    def apply_autoscaler(self, request: ApplyRequest):
        ocean_cluster_id = request.resourceId
        ocean_cluster_config = request.config
        logging.info(f'Applying autoscaler to ocean cluster: {ocean_cluster_id}'
                     f' with config: {ocean_cluster_config}')
        auto_scale = ApiOceanAutoScale()
        auto_scale.isEnabled=True
        ocean_cluster = ApiOceanCluster(autoScaler=auto_scale)
        results = self.api_repository.update_ocean_cluster(ocean_cluster_id, ocean_cluster)

        if not results:
            logging.error(f'Failed to apply autoscaler to ocean cluster: {ocean_cluster_id}')
            return False

        return True







