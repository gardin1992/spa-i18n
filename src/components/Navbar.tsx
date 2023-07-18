import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonLink from "./ButtonLink";

const navItems = [
  {
    href: "/",
    name: "home",
    translateKey: "home",
  },
  {
    href: "/account",
    name: "account",
    translateKey: "account",
  },
  {
    href: "/about",
    name: "about",
    translateKey: "about",
  },
  {
    href: "/card",
    name: "Card",
    translateKey: "Cards",
  },
] as const;

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>

        {navItems.map((item, index) => (
          <ButtonLink key={index} {...item} />
        ))}
      </Toolbar>
    </AppBar>
  );
}
