import React from 'react';
import './css/About.css';
import Header from './Header';
import Footer from "./Footer";
import AAService from "./resource/AboutPage/avasangelsservices.png";
import AALogo from "./resource/AboutPage/AALogoAboutPage.png";
import LocationIcon from "./resource/AboutPage/location.png";
import LinkIcon from "./resource/AboutPage/link.png";
import FigureIcon from "./resource/AboutPage/figure.png";

const css = {
    box: {
        height: '40vw',
        width: '70%',
        border: '0.25vw solid pink',
        overflowY: 'scroll',
        marginLeft: '15%',
        marginTop: '5%',
    },
}
const images = [] 
const refs = [] 

for (let i=0; i<39; i++) { 
const ref = React.createRef() 
refs.push(ref) 
images.push(
    <div class = "imageBox">
    {/* eslint-disable-next-line */}
        <img ref = { ref } data-src = {require('./resource/AboutPage/activity' + i + '.jpg')} />
    </div>
)
}

const threshold = [0.01] 

const io = new IntersectionObserver((entries)=>{ 
entries.forEach((item)=>{ 
    if (item.intersectionRatio <= 0 ) return 
    const {target} = item
    target.src = target.dataset.src 
})
}, {
threshold, 
});


const onload = ()=>{
refs.forEach( (item) => {
    io.observe(item.current) 
} )
}


const LazyLoadPage = ()=>(
<div style={css.box}>
    {images}
    {/* eslint-disable-next-line */}
    <img onError={onload} src="" />
</div>
)

class About extends React.Component {
    render(){
        return(
            <div>
                <Header />

                <div class = "establish_header">Establish</div>
                <div class = "establish">
                    <img src = {AALogo} alt = "Ava's Angel Logo" class = "establish_logo"/>
                    <div class = "establish_content">
                        <p>
                            Ava{"'"}s Angels, established in March 2018, in memory of Ava Akers, who lost her life in 2017 aged just 3 years old. 
                            Inspired by Ava and seeing the importance of support whilst caring for a poorly child, 
                            Ava{"'"}s Angels was established with the following mission statement: Providing relief of sickness and suffering 
                            among children being cared for in hospital by providing items, services and emotional support for families 
                            to enable them to visit, spend quality time with and care for such children.
                        </p>
                        <div class = "establish_icon">
                            <img src = {LocationIcon} alt = "Location Icon" />
                            <a href = "https://www.google.com/maps/place/Ackleton/@52.5828289,-2.3485737,15z/data=!3m1!4b1!4m5!3m4!1s0x487086d0dac8c695:0x91844632d625fdb7!8m2!3d52.584887!4d-2.3412091" target = "_blank" rel= "noopener noreferrer">Ackleton, England</a>
                            <img src = {LinkIcon} alt = "Link Icon" />
                            <a href = "https://www.avas-angels.com/" target = "_blank" rel= "noopener noreferrer">avas-angels.com</a>
                            <img src = {FigureIcon} alt = "Figure Icon" />
                            <a href = "https://uk.linkedin.com/in/phillip-akers-8a0a8810" target = "_blank" rel= "noopener noreferrer">Phill Akers(Founder)</a>
                        </div>      
                    </div>
                </div>

                <div class="service_header"> Service: </div>
                <div class = "service">
                    <img src = {AAService} alt = "ava's angel service"/>
                </div>

                <div class="activity_header"> Activity: </div>
                <LazyLoadPage />
                <Footer />
            </div>
            )
        }
    }

export default About;