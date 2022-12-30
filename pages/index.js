import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/post';
import Link from 'next/link';
import Date from '../components/date';
import { useState } from 'react';
import { Card, CardMedia, Box, Typography, Stack, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home( {allPostsData} ) {
  const [paused, setPaused] = useState(false);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        
      </Head>
      <audio
        controls
        src="/smalltownmusic.mp3">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
      <section>
      <Card
  variant="outlined"
  sx={{
    p: 1,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
  }}
>
  <CardMedia
    component="img"
    width="124"
    height="124"
    src="/images/smalltown.jpg"
    sx={{
      borderRadius: 0.5,
      width: 'clamp(124px, (304px - 100%) * 999 , 100%)',
    }}
  />
  <Box sx={{ alignSelf: 'center', px: { xs: 0, sm: 2 } }}>
    <Typography
      variant="body1"
      color="text.primary"
      fontWeight={600}
      sx={{
        textAlign: { xs: 'center', sm: 'start' },
        mt: { xs: 1.5, sm: 0 },
      }}
    >
      A Weekday In A Small Town
    </Typography>
    <Typography
      component="div"
      variant="caption"
      color="text.secondary"
      fontWeight={500}
      sx={{ textAlign: { xm: 'center', sm: 'start' } }}
    >
      FSM Team & e s c p
    </Typography>
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mt: 2,
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
      }}
    >
      <IconButton aria-label="fast rewind" disabled>
        <FastRewindIcon />
      </IconButton>
      <IconButton
        aria-label={paused ? 'play' : 'pause'}
        sx={{ mx: 1 }}
        onClick={() => setPaused((val) => !val)}
      >
        {paused ? <PlayArrowIcon /> : <PauseIcon />}
      </IconButton>
      <IconButton aria-label="fast forward" disabled>
        <FastForwardIcon />
      </IconButton>
    </Stack>
  </Box>
</Card>
      </section>

       
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recent Blog Post</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}