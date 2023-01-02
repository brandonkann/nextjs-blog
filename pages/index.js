import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/post';
import Link from 'next/link';
import Date from '../components/date';
import { useState, useRef, useEffect } from 'react';
import { Card, CardMedia, Box, Typography, Stack, IconButton, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Image from 'next/image';

import Button from '@mui/material';
import { borderRadius } from '@mui/system';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home( {allPostsData} ) {
  const mp3Src = '/smalltownmusic.mp3'
  const [music, setMusic] = useState({});
  const [paused, setPaused] = useState(false);
  
  useEffect(() => {
    if (typeof Audio !== 'undefined' && mp3Src) {
      const audio = new Audio(mp3Src);
      setMusic(audio);
    }
  }, [mp3Src])

  const musicHandler = () => {
    console.log(paused)
    setPaused((val) => !val)
    paused ? music.pause() : music.play() ;
  }

  
  return (
  <>
   
      <Head>
        <title>{siteTitle}</title>
        
      </Head>

    <Grid container sx={{ alignSelf: 'center'}}>
    <Grid item xs={6}>
      <Box sx={{ alignSelf: 'center', m: { xs: 2, sm: 3 } }}>
        <Grid container>

          <Grid item xs={8}>
          <h1>Brandon Kan</h1>
        <p>Microsoft CRM Consultant at Deloitte</p>

        <p>Helping Microsoft developer build faster CRM. Teaching about PCFs, D365 best preactices, and more!</p>



          </Grid>

          <Grid item sx={{ alignSelf:'center'}}>
          <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              width='115'
              height='115'
              alt=""
            />
          </Grid>


        </Grid>

<h2>Featured Posts</h2>
        <Grid container spacing= {2}>

<Grid item xs={4}>
<Card variant="outlined" sx={{ height: 200, borderRadius:2, alignSelf:'center' }}>
      <Typography level="h2" fontSize="md" sx={{ m: 0.5, justifyContent:'center' }}>
        How to enable your workstation for PCF Development
      </Typography>
    
    
    
    </Card>

</Grid>
<Grid item xs={4}>
 <Card variant="outlined" sx={{ height: 200, borderRadius:2 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        TODO
      </Typography>
  
   
       

    
    </Card>



</Grid>
<Grid item xs={4}>

<Card variant="outlined" sx={{ height: 200, borderRadius:2 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        TODO
      </Typography>
  
      
    
    </Card>



</Grid>

</Grid>



      
    
    


    
      </Box>
    </Grid>

    <Grid item xs={6}>
    <Layout home>       
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>My Recent Blog Post</h2>
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


      <Link href="/posts/page/1">Read All posts</Link>
      <section>
      <Card
  variant="outlined"
  sx={{
    p: 2,
    display: 'inline-block',
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
        onClick={musicHandler}
      >
        {paused ? <PauseIcon />  : <PlayArrowIcon />}
      </IconButton>
      <IconButton aria-label="fast forward" disabled>
        <FastForwardIcon />
      </IconButton>
    </Stack>
  </Box>
</Card>
      </section>
    </Layout>

  
    </Grid>

    </Grid>
      

     
    </>
  );
}