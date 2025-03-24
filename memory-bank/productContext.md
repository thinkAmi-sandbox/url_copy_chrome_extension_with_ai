# 解決すべき問題

Chromeで表示しているページのURLについて、ブログ向けに参考URLとして掲載する場合、markdownのURL形式とする必要があります。
例：[Clineとともに、AmazonのURLをシンプル化するChrome拡張を作ってみた - メモ的な思考的な](https://thinkami.hatenablog.com/entry/2025/03/23/225415)

現在はアドレスバーのURLとページのタイトルを別々にコピペして、markdownのURL形式化していますが、手間がかかっています。

そこで、Chrome拡張を使って、表示しているページのURLとタイトルを使ってmarkdownのURL形式を作り出せるようにします。


# Chrome拡張の機能

- Chromeで表示しているページのURLとHTMLのtitleタグを元に、ショートカットキーを押すことで、markdown形式のURLをクリップボードへとコピーします
- ショートカットキーについて、OSごとに以下を想定しています
  - OS別
    - Windows
      - `Ctrl+C`
    - macOS
      - `Cmd+C`
  
- markdown形式は以下とします。
  - `[<表示しているHTMLのtitleタグ>](<表示しているページのURL>)`
    - `<表示しているHTMLのtitleタグ>` には、表示しているHTMLのtitleタグを設定します
    - `<表示しているページのURL>` には、表示しているページのURLを設定します
- クリップボードへコピーしたら、その内容をブラウザ上にflashメッセージのような形で表示します


# Chrome拡張の動作に関する期待値について

|番号|URL|titleタグ|期待値|
|---|---|---|---|
|1|https://thinkami.hatenablog.com/entry/2025/03/23/225415|`<title>Clineとともに、AmazonのURLをシンプル化するChrome拡張を作ってみた - メモ的な思考的な</title>`|`[Clineとともに、AmazonのURLをシンプル化するChrome拡張を作ってみた - メモ的な思考的な](https://thinkami.hatenablog.com/entry/2025/03/23/225415)`|
