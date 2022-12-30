import Head from "next/head";
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { Box } from "@mui/system";


export default function aboutme() {
    return(
        <>
        <Box
            display="flex"
            alignItems="center"
            sx= {{flexDirection: 'column' }}>
        <h1 className={utilStyles.heading2Xl}>About Me</h1>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={444}
              width={444}
              alt=""
            />

<section className={utilStyles.headingMd}>
        <p>A Microsoft CRM and Web Developer</p>
        <p>
          A Cloud Consultant at Deloitte looking to sharpen my skills in web and Cloud Technologies. 
        </p>
      </section>
        </Box>

      
        </>
    )
}