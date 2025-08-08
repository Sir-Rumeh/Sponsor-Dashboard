import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="d-footer bg-white dark:bg-[#273142] py-6 px-[22px] mt-[auto]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="mb-0 text-neutral-600 dark:text-white">
          &copy; {currentYear} WowDash. All Rights Reserved.
        </p>
        <p className="mb-0 dark:text-white">
          Made by
          <Link
            href="https://themeforest.net/user/wowtheme7/portfolio"
            className="font-medium text-blue-600 dark:text-blue-600 hover:underline"
          >
            {" "}
            wowtheme7
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
