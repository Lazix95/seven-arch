import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { SharedCopyright } from './SharedCopyright';

// const footers: unknown[] = [
// {
//   title: 'Company',
//   description: ['Team', 'History', 'Contact us', 'Locations'],
// },
// {
//   title: 'Features',
//   description: [
//     'Cool stuff',
//     'Random feature',
//     'Team feature',
//     'Developer stuff',
//     'Another one',
//   ],
// },
// {
//   title: 'Resources',
//   description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
// },
// {
//   title: 'Legal',
//   description: ['Privacy policy', 'Terms of use'],
// },
// ];

export function SharedDefaultFooter() {
  return (
    <Container maxWidth="md" component="footer" sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, mt: 0, py: [3, 6] }}>
      <Grid container spacing={4} justifyContent="space-evenly">
        {/* {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))} */}
      </Grid>
      <SharedCopyright sx={{ mt: 5 }} />
    </Container>
  );
}
