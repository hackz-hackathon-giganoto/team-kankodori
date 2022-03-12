# キャンバス共有プロトコル

## 基本方針

中央集権的な、バックエンドで DB を持って…はリソースの管理が重くなりうるので避ける。
（フロントの難解さとトレードオフ）

これにより、フロントエンド間で通信ができれば良くなり通信方法の自由度は上がる。

## 接続

接続時、`Sync Request`を送信し、`Sync`を要求する。
`Sync`には全ストローク情報を含めることで同期を図る。

```mermaid
sequenceDiagram
  actor A as ClientA
  actor B as ClientB
  A --> A : 接続
  B --> B : 接続
  B ->> A : Sync Request
  activate A
  A ->> B : Sync
  deactivate A
```

## 描画

描画毎にストローク情報を送信する。

```mermaid
sequenceDiagram
  actor A as ClientA
  actor B as ClientB
  A --> A : 描画
  A ->> B : Stroke
```

## WebSocket などのサーバを介し、３人以上の場合

基本方針は変わらず、クライアントサイドに処理の重きを置く。

サーバはクライアントから送られてきた通信をブロードキャストする。

```mermaid
sequenceDiagram
  actor ClientA
  participant Server
  actor ClientB
  actor ClientC
  actor ClientD
  ClientA --> ClientA : 描画
  ClientA ->> Server : Stroke
  Server ->> ClientB : Stroke
  Server ->> ClientC : Stroke
  Server ->> ClientD : Stroke
```
