// Use type safe message keys with `next-intl`
type Messages = typeof import("./src/messages/pt-BR.json");
declare interface IntlMessages extends Messages {}
