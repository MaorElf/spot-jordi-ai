def skill(cluster_id):
    return {
        "o-2857b0c6": [{"ols-203243ad": "liorc-eks-02"}],
        "o-641ce6ba": [{"ols-e7c76da8": "ng-test1n"}],
        "o-f7edcda0": [{"ols-2dd7b076": "ng-test1n"}, {"ols-8ed6f290": "sapir"}]
    }.get(cluster_id, [])
