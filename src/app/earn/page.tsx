"use client";


import React, { useState, useEffect } from "react";
import Header from "../header";
import ElegantFooter from "../last";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import SignupForm from "../signup/SignupForm";
import { NextSeo } from "next-seo"; // Import NextSeo component



interface User {
    name: string;
    email: string;
    credits: number;
    referralCode: string;
}

interface ReferralData {
    earnedPointsAsReferrer: number;
    earnedPointsAsReferred: number;
    totalCompletedReferrals: number;
}

const EarnPage = () => {
    const [totalCompletedReferrals, setTotalCompletedReferrals] = useState<number>(0);
    const [earnings, setEarnings] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showSignupForm, setShowSignupForm] = useState(false);




    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
    
        const config = {
          method: "GET",
          url: `${serverURL}/users`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        try {
          const response = await axios(config);
          setUser(response.data.user);
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false);
          toast.error("Something went wrong!");
        }
      };
      
    useEffect(() => {
        getUser();
        
    }, []);

    
    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get<{ user: User }>(`${serverURL}/users`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
                    setUser(response.data.user);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast.error("Failed to load user data.");
                    setLoading(false);
                }
            };

            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchReferralData = async () => {
                try {
                    const response = await axios.get(`${serverURL}/referrals/earned-points`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
    
                    // Log response data to check what’s returned
                    console.log("Referral data response:", response);
    
                    const { earnedPointsAsReferrer, totalCompletedReferrals } = response.data;
                    setTotalCompletedReferrals(totalCompletedReferrals);
                    setEarnings(totalCompletedReferrals * 500);
                    console.log("Referral data:", response.data);
                } catch (error) {
                    // Log detailed error information
                    console.error("Error fetching referral data:", error);
                    if (axios.isAxiosError(error)) {
                        console.error("Axios error details:", error.response);
                    }
                    toast.error("Failed to load referral data.");
                }
            };
    
            fetchReferralData();
        }
    }, [isLoggedIn]);
    

    const copyReferralLink = () => {
        if (user && user.referralCode) {
            const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;
            navigator.clipboard
                .writeText(referralLink)
                .then(() => toast.success("Referral link copied to clipboard!"))
                .catch(() => toast.error("Failed to copy referral link."));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-black text-white">
                Loading...
            </div>
        );
    }



    return (
        <>

<NextSeo
                title="Earn with Our Referral Program"
                description="Earn rewards by referring your friends to NoAIGPT. Share your unique referral link and start earning credits."
                canonical="https://www.noaigpt.com/earn"
                openGraph={{
                    url: "https://www.noaigpt.com/earn",
                    title: "Earn with Our Referral Program",
                    description: "Earn rewards by referring your friends to NoAIGPT. Share your unique referral link and start earning credits.",
                    images: [
                        {
                            url: "/assets/images/earn.png",
                            width: 1200,
                            height: 630,
                            alt: "Referral Program",
                        },
                    ],
                    site_name: "NoAIGPT",
                }}
                twitter={{
                    cardType: "summary_large_image",
                    site: "@NoAIGPT",
                    handle: "@NoAIGPT",
                }}
            />   

            <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
                <Header onShowSignupForm={() => setShowSignupForm(true)}/>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
                    <h1 className="text-center text-4xl md:text-5xl font-semibold text-gray-100">
                        Earn with Our Referral Program
                    </h1>

                    {/* New Card for Referrals and Earnings */}
                    {isLoggedIn && (
                    <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-3xl mx-auto my-12 rounded-2xl">
                        <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                            <CardTitle className="text-2xl font-extrabold text-white">
                                Referral Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <p className="text-neutral-400 text-lg">
                                <strong>Total Completed Referrals:</strong> {totalCompletedReferrals}
                            </p>
                            <p className="text-neutral-400 text-lg">
                                <strong>Total Earnings:</strong> {earnings } Credits
                            </p>
                        </CardContent>
                    </Card>)}

                    {/* How It Works Section */}
                    <Card className="bg-neutral-900 border border-neutral-800 shadow-2xl w-full max-w-7xl mx-auto my-12 rounded-2xl">
                        <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                            <CardTitle className="text-3xl font-extrabold text-white">
                                How It Works
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            <p className="text-lg text-neutral-400">
                                Here's how you can earn 500 credits by simply referring your friends. It's quick, easy, and rewarding!{" "}
                                <span className="ml-2">💸</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Step 1 */}
                                <Card className="bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                                    <CardHeader className="bg-neutral-700 p-4 rounded-xl">
                                        <CardTitle className="text-xl font-semibold text-white">
                                            Share Your Referral Link
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-neutral-400 text-base pt-8">
                                            Copy your unique referral link and share it with your friends via social media, text, or email.
                                        </p>
                                        <Button
                                            onClick={copyReferralLink}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
                                        >
                                            {isLoggedIn ? "Copy Referral Link" : "Sign In and Copy Link"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Step 2 */}
                                <Card className="bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                                    <CardHeader className="bg-neutral-700 p-4 rounded-xl">
                                        <CardTitle className="text-xl font-semibold text-white">
                                            Friend Logs In
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-neutral-400 text-base pt-8">
                                            Your friend uses your referral link to sign up and create their account.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Step 3 */}
                                <Card className="bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                                    <CardHeader className="bg-neutral-700 p-4 rounded-xl">
                                        <CardTitle className="text-xl font-semibold text-white">
                                            Earn 500 Credits
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-neutral-400 text-base pt-8">
                                            Once your friend logs in, you and your friend will automatically receive 500 credits.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                    <div>

</div>

                    <ToastContainer theme="dark" />
                    {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
                    <ElegantFooter />
                </div>
            </main>
        </>
    );
};

export default EarnPage;
