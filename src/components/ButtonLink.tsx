import {
  Button,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  styled,
} from "@mui/material";
import Link from "next-intl/link";
import React, { useMemo } from "react";
import withTranslation from "./core/withTranslation";

const StyledLink = styled(Button)`` as typeof MuiLink;

type Props = MuiLinkProps & {
  name?: string;
  translateKey?: string;
};

function ButtonLink({ name, translateKey, ...props }: Props, t: any) {
  const text = useMemo(() => {
    try {
      return t(translateKey ?? name);
    } catch (e) {
      return name;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, translateKey]);

  return (
    <StyledLink sx={{ my: 2, display: "block" }} component={Link} {...props}>
      {text}
    </StyledLink>
  );
}

export default withTranslation(ButtonLink, "Navigation");
