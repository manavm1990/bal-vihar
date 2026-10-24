import Article from "@components/article";
import { Card, CardContent } from "@components/ui/card";
import { P } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";

import DisclaimerForm from "./components/form/disclaimer-form.client";

const TITLE = "Disclaimer Form";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
  description:
    "Parent consent and liability disclaimer for Bal Vihar of St. Louis school activities.",
};

export default function DisclaimerPage() {
  return (
    <Article title={TITLE} className="md:columns-1">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="space-y-3 text-sm sm:text-base">
          <P>
            I/We hereby give my/our consent for the student(s) named below to participate in Bal
            Vihar of St. Louis (&quot;Bal Vihar&quot;) school activities. I/We also consent to Bal
            Vihar using student pictures, activities, etc. for advertising purposes. I/We also give
            my/our consent for him/her/them to participate in school activities and will not hold
            Bal Vihar responsible in case of an accident, injury or exacerbation of any
            medical/psychological condition. We hereby agree to hold the Bal Vihar school, its
            administrative staff, and volunteers harmless from any and all liabilities, actions,
            causes of action, debts, claims, demands of every kind and nature including losses of
            any kind whatsoever that may arise by or in connection with the participation by my/our
            child/children in any activities related to Bal Vihar program.
          </P>
          <P>
            In no event shall Bal Vihar of St. Louis, MO be liable for any direct/indirect punitive,
            special incidental or consequential damage, however it arises, whether for breach or in
            tort, even if Bal Vihar of St. Louis, MO has been previously advised of the possibility
            of such damage. I agree to hold Bal Vihar of St. Louis, MO harmless from, and I covenant
            not to sue Bal Vihar of St. Louis, MO for any claim related to Bal Vihar programs. I
            have been advised of potential food allergies to &quot;prasad&quot; distributed by Bal
            Vihar and I accept &quot;prasad&quot; at my own risk.
          </P>
          <P>
            Please note that it is the parent&apos;s responsibility to arrange for bringing and
            picking up the student(s) to the school. If parent(s) arrange(s) for the student&apos;s
            pick-up from the classroom or the school, by a third party, without prior written &amp;
            dated communication with the Parent&apos;s Coordinator and classroom teacher, then Bal
            Vihar assumes no responsibility of the child after the class session is over.
          </P>
        </div>
        <Card className="w-full lg:sticky lg:top-8">
          <CardContent className="p-5 sm:p-6">
            <DisclaimerForm />
          </CardContent>
        </Card>
      </div>
    </Article>
  );
}
