import { TabsModule } from 'ngx-tabset';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { FeedbackComponent } from './components/common/feedback/feedback.component';
import { HotCollectionsComponent } from './components/common/hot-collections/hot-collections.component';
import { TopAuthorComponent } from './components/common/top-author/top-author.component';
import { HowToSellComponent } from './components/common/how-to-sell/how-to-sell.component';
import { PopularNftsComponent } from './components/common/popular-nfts/popular-nfts.component';
import { LiveAuctionNftsComponent } from './components/common/live-auction-nfts/live-auction-nfts.component';
import { TopSellersComponent } from './components/common/top-sellers/top-sellers.component';
import { TrendingNftsComponent } from './components/common/trending-nfts/trending-nfts.component';
import { HomeoneBannerComponent } from './components/pages/home-demo-one/homeone-banner/homeone-banner.component';
import { HometwoBannerComponent } from './components/pages/home-demo-two/hometwo-banner/hometwo-banner.component';
import { HomethreeBannerComponent } from './components/pages/home-demo-three/homethree-banner/homethree-banner.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { ExplorePageOneComponent } from './components/pages/explore-page-one/explore-page-one.component';
import { GetInvolvedComponent } from './components/common/get-involved/get-involved.component';
import { ExplorePageTwoComponent } from './components/pages/explore-page-two/explore-page-two.component';
import { ExplorePageThreeComponent } from './components/pages/explore-page-three/explore-page-three.component';
import { ExplorePageFourComponent } from './components/pages/explore-page-four/explore-page-four.component';
import { ExplorePageFiveComponent } from './components/pages/explore-page-five/explore-page-five.component';
import { ExplorePageSixComponent } from './components/pages/explore-page-six/explore-page-six.component';
import { ExplorePageSevenComponent } from './components/pages/explore-page-seven/explore-page-seven.component';
import { LiveAuctionPageComponent } from './components/pages/live-auction-page/live-auction-page.component';
import { AuthorProfilePageComponent } from './components/pages/author-profile-page/author-profile-page.component';
import { ActivityPageComponent } from './components/pages/activity-page/activity-page.component';
import { AuthorsPageComponent } from './components/pages/authors-page/authors-page.component';
import { ConnectWalletPageComponent } from './components/pages/connect-wallet-page/connect-wallet-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { TeamComponent } from './components/common/team/team.component';
import { PartnerFunfactsComponent } from './components/common/partner-funfacts/partner-funfacts.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CreatePageComponent } from './components/pages/events/create-page/create-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { CollectionPageComponent } from './components/pages/collection-page/collection-page.component';
// import { ItemDetailsPageComponent } from './components/pages/item-details-page/item-details-page.component';
import { NgbAlertModule, NgbCollapseModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Web3ModalCoreButtonWrapperModule } from './Web3Modal/web3modal.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ToastsComponent } from './components/common/toasts/toasts.component';
import { ManageEventComponent } from './components/pages/events/manage-event/manage-event.component';
import { EventDetailComponent } from './components/pages/events/event-detail/event-detail.component';
import { AddTicketCategoryModalComponent } from './components/pages/events/add-ticket-category-modal/add-ticket-category-modal.component';
import { BuyTicketModalComponent } from './components/pages/events/buy-ticket-modal/buy-ticket-modal.component';
import { TutorialsComponent } from './components/common/tutorials/tutorials.component';
import { FaucetComponent } from './components/pages/events/faucet/faucet.component';
import { MyTicketsComponent } from './components/pages/events/my-tickets/my-tickets.component';
import { VerifyTicketComponent } from './components/pages/verify-ticket/verify-ticket.component';
import { TicketDetailsComponent } from './components/pages/events/ticket-details/ticket-details.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
    declarations: [
        AppComponent,
        HomeDemoOneComponent,
        HomeDemoTwoComponent,
        HomeDemoThreeComponent,
        FooterComponent,
        FeedbackComponent,
        HotCollectionsComponent,
        TopAuthorComponent,
        HowToSellComponent,
        PopularNftsComponent,
        LiveAuctionNftsComponent,
        TopSellersComponent,
        TrendingNftsComponent,
        HomeoneBannerComponent,
        HometwoBannerComponent,
        HomethreeBannerComponent,
        BlogComponent,
        ExplorePageOneComponent,
        GetInvolvedComponent,
        ExplorePageTwoComponent,
        ExplorePageThreeComponent,
        ExplorePageFourComponent,
        ExplorePageFiveComponent,
        ExplorePageSixComponent,
        ExplorePageSevenComponent,
        LiveAuctionPageComponent,
        AuthorProfilePageComponent,
        ActivityPageComponent,
        AuthorsPageComponent,
        ConnectWalletPageComponent,
        AboutPageComponent,
        ContactPageComponent,
        TeamComponent,
        PartnerFunfactsComponent,
        BlogPageComponent,
        BlogDetailsPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        CreatePageComponent,
        TermsConditionsPageComponent,
        PrivacyPolicyPageComponent,
        NotFoundPageComponent,
        FaqPageComponent,
        NavbarComponent,
        CollectionPageComponent,
        // ItemDetailsPageComponent,
        ToastsComponent,
        ManageEventComponent,
        EventDetailComponent,
        AddTicketCategoryModalComponent,
        BuyTicketModalComponent,
        TutorialsComponent,
        FaucetComponent,
        MyTicketsComponent,
        VerifyTicketComponent,
        TicketDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        // StickyNavModule,
        NgxScrollTopModule,
        AccordionModule,
        NgxSimpleCountdownModule,
        TabsModule,
        NgbModule,
        Web3ModalCoreButtonWrapperModule,
        NgbAlertModule,
        NgbCollapseModule,
        NgbToastModule,
        Web3ModalCoreButtonWrapperModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        QRCodeModule

    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
