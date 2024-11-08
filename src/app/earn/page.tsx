'use client';

import React, { useState, useEffect } from "react";
import Header from "../header";
import ElegantFooter from "../last";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";


interface User {
    name: string;
    email: string;
    credits: number;
    referralCode: string;
  }

const EarnPage = () => {
    const [totalReferrals, setTotalReferrals] = useState<number>(0);
    const [pendingReferrals, setPendingReferrals] = useState<number>(0);
    const [totalCompletedReferrals, setTotalCompletedReferrals] = useState<number>(0);
    const [earnings, setEarnings] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);



    // Example data loading (replace this with actual API/data fetching logic)
    useEffect(() => {
        setTotalReferrals(50); // Example value
        setPendingReferrals(20); // Example value
        setTotalCompletedReferrals(30); // Example value
        setEarnings(totalCompletedReferrals * 500); // Each successful referral earns 500 credits
    }, [totalCompletedReferrals]);

    useEffect(() => {
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
    
      }, []);


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
    
      if (!user) {
        return (
          <div className="text-center text-gray-400">No user data available.</div>
        );
      }

      const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;
      

    return (
        <div className="bg-black text-white min-h-screen flex flex-col">
            <Header />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
            {/* Page Title */}
    <h1 className="text-center text-4xl md:text-5xl font-semibold text-gray-100 ">
        Earn with Our Referral Program
    </h1>

    {/* Referral Scheme Details */}
    <div className="my-8">
        <h2 className="text-3xl font-bold mb-4">Referral Earning Scheme</h2>
        <p className="text-lg mb-6">
            Our referral program rewards you for bringing in new users. For each successful referral, you’ll receive
            <strong> 500 credits</strong>, and the person you refer will get
            <strong> 100 credits</strong>.
        </p>
        <p className="text-lg mb-6">
            You can track the progress of your referrals below:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3 text-lg">
            <li><strong>Each successful referral:</strong> You earn 500 credits, and your referral gets 100 credits.</li>
            <li><strong>Pending referrals:</strong> These are referrals that are still waiting for confirmation.</li>
            <li><strong>Successful referrals:</strong> Referrals that have completed the sign-up process.</li>
        </ul>
        <p className="text-lg font-semibold mb-4">How it works:</p>
        <ol className="list-decimal pl-6 text-lg space-y-2">
            <li>Share your unique referral link with your friends.</li>
            <li>For every successful sign-up made through your link, you'll earn credits.</li>
            <li>The person you refer also gets rewarded!</li>
            <li>Credits can be redeemed for rewards and exclusive offers on our platform.</li>
        </ol>
    </div>

    {/* Referral Data */}
    <div className="my-8">
        <h2 className="text-3xl font-bold mb-6">Referral Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Total Referrals</h3>
                <p className="text-2xl">{totalReferrals}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Pending Referrals</h3>
                <p className="text-2xl">{pendingReferrals}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Completed Referrals</h3>
                <p className="text-2xl">{totalCompletedReferrals}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold mb-2">Your Total Earnings</h3>
                <p className="text-2xl">{earnings} credits</p>
            </div>
        </div>
    </div>

    {/* Call to Action */}
    <div className="flex justify-center items-center mb-8">
        <Card className="bg-neutral-900 border border-neutral-800 shadow-md overflow-hidden w-full max-w-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <span className="mr-2">👥</span> Refer Your Friends
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <p className="text-lg text-neutral-400 mb-6">
                    Earn{" "}
                    <span className="font-bold text-blue-400">500 credits</span>{" "}
                    for each friend who signs up using your referral code!{" "}
                    <span className="ml-2">🎉</span>
                </p>
                <div className="flex justify-center w-full p-4 rounded-lg mb-6 bg-neutral-800">
                    <a
                        href={referralLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-400 hover:text-blue-500 text-center w-full transition-colors duration-200"
                    >
                        {referralLink}
                    </a>
                </div>
                <Button
                    onClick={copyReferralLink}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                    <span className="mr-2">📋</span> Copy Referral Link
                </Button>
            </CardContent>
        </Card>
    </div>

    <ElegantFooter />
</div>
</div>
    );
};

export default EarnPage;