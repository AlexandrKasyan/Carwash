import React from "react";
import './homeStyle.css'
import { Container } from "react-bootstrap";

const Home = () => {


    return (
        <div className="wrap-home">
            <div className="our-advantages">
                <Container>
                    <h2 className="our-advantages">Наши преимущества</h2>
                </Container>
            </div>
            <Container >
                <div className="advantages-fact">
                    <div className="list-fact">
                        <div className="fact">
                            <img
                                className="img-lable-fact"
                                src="social_media_campaig.webp"
                                alt="Лучшие цены на мойку авто" />
                            <div>Мы применяем европейские технологии для ухода за вашим автомобилем.</div>
                        </div>
                        <div className="fact">
                            <img
                                className="img-lable-fact"
                                src="value_icon_150042.webp"
                                alt="Лучшие качество" />
                            <div>
                                Мы не экономим на вас и вашем автомобиле,
                                при этом сохраняем лучшие цены на рынке в данном сегменте
                                качественного обслуживания.
                            </div>
                        </div>
                        <div className="fact">
                            <img
                                className="img-lable-fact"
                                src="idea_development_ico.webp"
                                alt="Лучшие качество" />
                            <div>
                                Мы не просто отмываем грязь, мы делаем это со знанием всех процессов
                                и внимательны к мелочам.
                            </div>
                        </div>
                        <div className="fact">
                            <img
                                className="img-lable-fact"
                                src="premium_quality_icon.webp"
                                alt="Лучшие качество" />
                            <div>
                                Наша задача не навредить поверхности автомобиля, а максимально сохранить её.
                            </div>
                        </div>

                    </div>
                    <img className="img-fact" src="IMG_5861.webp" alt="Ручная автомойка" />

                </div>
                <div className="advantages-fact">
                    <img className="img-fact" src="image-29-08-20-11-57.webp" alt="Ручная автомойка" />
                    <div className="list-fact">
                        <div className="fact">
                            Для ручной мойки мы используем микрофибровые варежки, которые позволяют деликатно удалить
                            загрязнения с кузова автомобиля не повреждая лако-красочное покрытие. Для нижних частей кузова
                            мы используем отдельные губки, тем самым избегая перекрестных загрязнений, что делает процесс
                            мойки более безопасным.
                        </div>
                        <div className="fact">
                            Для сушки автомобиля мы используем от 2 до 4 специальных микрофибровых полотенец,
                            которые стираются после каждого применения.
                        </div>
                        <div className="fact">
                            Мы регулярно проводим инспекцию моечных и сушащих материалов и
                            при необходимости заменяем их новыми.
                        </div>

                    </div>
                </div>
                <div className="advantages-fact">
                    <div className="list-fact">
                        <h2 className="fact">
                            Мы работаем круглосуточно
                        </h2>
                        <div className="fact">
                            Уважаемые автовладельцы, мы рады сообщить Вам, что теперь Автомойка GT работает КРУГЛОСУТОЧНО!
                            7 дней в неделю 24 часа в сутки Вы можете пользоваться нашими услугами!
                        </div>
                        <div className="fact">
                            Мы ценим Ваше время, поэтому проведём все необходимые процедуры с вашим автомобилем пока Вы
                            отдыхаете. Наши специалисты выполнят весь комплекс операций по мойке,
                            химчистке салона и полировке кузова Вашего автомобиля с неизменно высоким качеством.
                        </div>
                        <div className="fact">
                            Вы можете не беспокоиться за сохранность Вашего автомобиля, так как на территории
                            автомойки работает круглосуточное видеонаблюдение.
                        </div>
                    </div>
                    <img className="img-fact" src="unnamed.jpg" alt="Ручная автомойка" />
                </div>
            </Container>
        </div>

    );
};

export default Home;