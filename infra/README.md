## infra

インフラのコードがあります

### arm-tempalte
Azure Resource Manager テンプレート があります。
作成したコンポーネントをコードとして管理することは、`Infrastracture as a Code` と呼ばれ、一般的になっています。

以下のコンポーネントはコンソールで作成したあと、 ARM template を export して保存しています。
- Microsoft.AzureKubernetesService
    - バックエンドサービスの基盤として利用
- Microsoft.Storage.StorageAccount
    - svg を保存するための blob storage を利用するために利用
- Microsoft.ConfidentialLedger
    - 当初、`ConfidentialLedger` を利用してデータの保存をする予定だったため作成しました。

### cert-manager
Web サイトに HTTPS を利用して接続するためにはTLS 証明書を取得する必要があります。
Let's encrypt などが有名ですが、Kubernetes 上でやるには cert-manager を利用することが多いです。（裏側では Let's encrypt が利用されている）


### cluster-issuer
cluster-issuer は cert-manager を利用する際に必要になる オブジェクトです。

### cockroachdb

### ingress-nginx

### redis

### result
k8s 上に ingress-nginx や cert-manager など、helm を用いてインストールする際の出力を保存しています。



