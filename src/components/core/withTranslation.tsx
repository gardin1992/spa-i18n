import { CustomIntlMessage } from "@/lib/types/CustomIntlMessage";
import { useTranslations } from "next-intl";

function WithTranslationRender<T = unknown>(
  Component: React.FC<T>,
  namespace?: keyof CustomIntlMessage,
  props?: T
) {
  const t = useTranslations(namespace);
  return Component(props ?? ({} as T), t);
}

export default function withTranslation<T = unknown>(
  Component: React.FC,
  namespace?: keyof CustomIntlMessage
) {
  type Props = T extends unknown ? React.ComponentProps<typeof Component> : T;

  return function render(props?: Props) {
    return WithTranslationRender<Props>(
      Component as React.FC<Props>,
      namespace,
      props
    );
  };
}
