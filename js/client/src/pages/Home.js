import React from 'react';

function Home(props) {
  return (
    <div className="about_us">
      <nav id="top">
        <a href="#desc">Description</a>
        <a href="#hist">History</a>
        <a href="#contact">Contact info</a>
        <a href="#certificate">Certificate</a>
      </nav>
      <div className="about_us_intro">
        <h2>Welcome to the World of Cinema!</h2>
        <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="logo" id="logo"/>
        <p>
          CineMagic, a cinematic delight,<br/>
          Where stories come to life so bright,<br/>
          With screens that shine both day and night,<br/>
          A place of wonder, pure movie light.
        </p>
      </div>
      <section id="desc">
        <p itemProp="description">At <span itemType="name"><em>CineMagic</em></span>, we believe that cinema is not
          just about watching movies but experiencing stories that captivate and inspire. We are dedicated to
          creating a memorable and immersive cinematic journey for our audiences. In essence, for us,
          <dfn>cinema</dfn> is the art of storytelling through the mesmerizing medium of film, where every frame
          and sound come together to evoke emotions and transport viewers to different worlds.</p>
        <p><strong>Exquisite Movie Selection.</strong> We curate a diverse selection of films, ranging from timeless
          classics to the latest blockbusters. Our carefully chosen lineup caters to all tastes, ensuring that
          everyone can find a film they'll love. Whether you're a fan of heartwarming dramas, thrilling action,
          thought-provoking documentaries, or captivating animations, we have something for everyone.</p>
        <p><strong>State-of-the-Art Theatres.</strong> Enjoy our cutting-edge theatres designed to enhance your
          movie-watching experience. With comfortable seating, crystal-clear digital projection, and immersive
          surround sound, you'll feel like a part of the story on the big screen. Our commitment to the highest
          audio and visual standards ensures that every frame is brought to life with stunning clarity.</p>
        <p><strong>Indulge in Delicious Treats.</strong> No cinema experience is complete without delicious snacks.
          Our concession stands offer a wide array of mouthwatering treats, including freshly popped popcorn,
          tasty nachos, sweet candies, and refreshing drinks. Sit back, relax, and treat yourself to these
          delectable treats while enjoying your favorite films.</p>
        <p><strong>Visit Us Today.</strong> Explore the enchantment of cinema by visiting us. Prepare to be
          transported to different worlds, dive into incredible stories, and immerse yourself in the magic of the
          silver screen. Get ready for an extraordinary movie-watching experience, where dreams come to life!</p>
      </section>
      <video
        src="https://media.istockphoto.com/id/473335885/video/people-applauding.mp4?s=mp4-640x640-is&k=20&c=J__EL0Tcnlh2stGUOuQ5f6-cxjns3Zp9SHpCRos83Pc="
        autoPlay controls loop muted>
      </video>
      <hr/>
      <section id="hist">
        <h2>History of our company</h2>
        <ul>
          <li>
            <h3>2022: The Birth of a Cinematic Vision.</h3>
            <p>In the year 2022, our company was born with a passionate vision to provide exceptional cinematic
              experiences to movie enthusiasts. We embarked on a journey to create a cinema that would
              redefine the way people engage with films, making every visit an unforgettable adventure.</p>
          </li>
          <li>
            <h3>2023: Expansion and Innovation.</h3>
            <p>Building upon our initial success, we expanded our operations, opening new <abbr
              title=" state-of-the-art theaters">SATs</abbr> in key locations. These theaters were
              equipped with cutting-edge technology, ensuring that audiences enjoyed unparalleled visual and
              audio quality. To enhance the movie-watching experience, we introduced innovative concepts such
              as comfortable seating arrangements, immersive 3D screenings, and the latest advancements in
              projection technology. We were committed to pushing boundaries and setting <abbr
                title="new standards">NS</abbr> in the
              world of cinema. Our <abbr title=" state-of-the-art theaters">SATs</abbr> quickly became
              synonymous with top-tier cinematic experiences, drawing movie enthusiasts from far and wide.
              <br/>
              <q lang="en">This cinema truly lives up to its vision,</q> raved Mark Davis, a frequent
              moviegoer. <q>I've
                had the pleasure of experiencing films here, and it's like stepping into a different world
                each time. Their dedication to creating unforgettable experiences is evident in every
                detail.</q>
              <q lang="de">Zwei Dinge sind unendlich, das Universum und die menschliche Dummheit, aber bei dem
                Universum bin ich mir noch nicht ganz sicher</q>
            </p>
          </li>
        </ul>
      </section>
      <hr/>
      <div id="about_us_contact">
        <section id="contact">
          <h2>Contact us</h2>
          <p>email: cine_magic@example.com</p>
          <p>phone: +375293629373</p>
        </section>
        <div id="certificate">
          <div id="certificate_inner">
            <p>Certificate of Completion</p>
            <p><i>This is to certify that</i></p>
            <p><b><em>CineMagic</em></b></p>
            <p><i>was entered into the register of cinemas</i></p>
            <p>with register number <b>3725</b></p>
          </div>
          <div id="dated">
            <p><i>dated</i></p>
            <time>10 February 2022</time>
          </div>
        </div>
      </div>
      <p><a href="#top">Up ↑</a></p>
    </div>
  );
}

export default Home;