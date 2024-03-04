from flask import Flask, request
import logging

from apply_request import ApplyRequest
from features_handler import FeaturesHandler

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
features_handler = FeaturesHandler()


@app.errorhandler(ValueError)
def handle_value_error(e):
    return f'Error occurred: {str(e)}', 500


@app.route('/')
def hello_world():
    return ('Jordi Core')


@app.route('/apply', methods=['POST'])
def apply():
    json_request = request.get_json()
    apply_request: ApplyRequest = ApplyRequest.from_dict(json_request)
    logging.info(f'Applying {apply_request.config} to {apply_request.featureName} for {apply_request.resourceId}')
    results = features_handler.apply(apply_request)

    if results:
        return 'Success', 200
    else:
        return 'Failed', 500


if __name__ == '__main__':
    app.run(port=1234)
