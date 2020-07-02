import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Header from "./LandingPageHeader";
import Footer from "./LandingPageFooter";
import UserContext from "../context/UserContext";
import { isUserSubscribed } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const [user, userLoading] = useContext(UserContext);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const setSubscriptionStatus = async () => {
      setSubscribed(await isUserSubscribed(user.uid));
    };

    user && setSubscriptionStatus();
  }, [user]);

  // return null until user is done loading
  if (userLoading) return null;

  // figure out current user status, if any
  // todo: abstract this away somehow? Logic shouldn't live here
  const status = user ? (subscribed ? "paid" : "free") : "none";

  const tiers = [
    {
      title: "Free",
      price: "0",
      description: [
        "Create one course",
        "25 items per course",
        "Email support",
      ],
      button: (
        <>
          {status === "free" ? (
            <Button fullWidth variant="outlined" color="primary" disabled>
              You have this plan
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/"
              fullWidth
              variant="outlined"
              color="primary"
            >
              Sign up for free
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Pro",
      subheader: "Most popular",
      price: "10",
      description: [
        "Create unlimited courses",
        "Unlimited items per course",
        "Priority email support",
      ],
      button: (
        <>
          {status === "paid" ? (
            <Button fullWidth variant="outlined" color="primary" disabled>
              You have this plan
            </Button>
          ) : (
            <Button
              onClick={() => alert("subscribe me!")}
              fullWidth
              variant="contained"
              color="primary"
            >
              Get started
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Enterprise",
      price: "30",
      description: [
        "Create unlimited courses",
        "Unlimited items per course",
        "Phone + email support",
      ],
      button: (
        <Button
          href="mailto:hello@dayonelabs.io?subject=Enterprise plan inquiry"
          target="_blank"
          fullWidth
          variant="outlined"
          color="primary"
        >
          Contact us
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header />

      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Subscribe today for unlimited access to Courseflo—the fastest way to
          create online courses and quizzes.
        </Typography>
      </Container>
      {/* End hero unit */}

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>{tier.button}</CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
