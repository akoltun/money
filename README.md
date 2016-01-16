# Finanzmanager

Backend wurde mit Node.js und framework Koa.js gebaut. Es arbeitet mit der Datenbank MongoDB zusammen. Die Datenmodellen wurden mit Mongoose gebaut.
Für Tests wird Mocha benutzt und Gulp als Task-Manager.
Der Code verwendet die neuen Features des Standards-ES2015, wie Generator Function und Promises mit  Co Library, um einen asynchronen Code wie Synchron zu schreiben. Der Code wird auch mit anderen Features von ES2015 geschrieben.
Das Projekt besteht aus 4 Modellen: Benutzer, Konto, Kategorie, Transaktion. Sie wirken aufeinander und lassen die Finanzen einfacher führen.

Frontend ist noch in der Entwicklung, in der Bootstrab Framework für die schnelle Prototypisierung benutzt wird. ES2015 Code wird mit Babel in den es5-Standard kompiliert. Webpack wurde als Modul Bündler wegen Flexibilität ausgewählt.