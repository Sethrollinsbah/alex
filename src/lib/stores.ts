import { writable } from "svelte/store";

export const show_succ_mod = writable(false);
export const ecsIP =
  "http://ubreakifixlb-732226636.us-east-1.elb.amazonaws.com";
// Store to hold a string or null value
export let amt = writable<string | null>(null);
export let name = writable<string | null>(null);
export let phone = writable<string | null>(null);
export let zip = writable<string | null>(null);
export let code = writable<string | null>("US");
export let email = writable<string | null>(null);
export let company = writable<string | null>(null);
export let job_title = writable<string | null>(null);

// Store to hold a boolean value
export let monthly = writable<boolean>(false);
export let nav = writable<boolean>(false);
export const pageIntPay = writable<number | null>();
export const isNightMode = writable();
export const paymentsModal = writable<boolean | null>(false);
export const contactSalesStore = writable<boolean>(false);
// @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
export const fineTuneModal = writable<string | null>(false);
export const currentPageNew = writable<string | null>("");
export const selecttime = writable<string | null>();
export const select = writable();
export const isVisible = writable<boolean>(false);
export const customTemplateModal = writable<boolean>(false);
export const tableModal = writable<boolean>(false);
export const pageTitleSettings = [
  {
    id: 0,
    title: "Usage",
  },
  {
    id: 2,
    title: "Account",
  },
  {
    id: 3,
    title: "Team",
  },
];
export const modelurl = writable<string>("");
export const modelname = writable<string>("");
export const contextstring = writable<string>("");
export const regexstring = writable<string>("");
export const supportTopic = writable<boolean>(false);
export const launchSupport = writable<boolean>(false);
export const password = writable<string>("");
export const firstName = writable<string | null>();
export const lastName = writable<string | null>();
export const pageInt = writable<number | null>();
export const pageTitleDomains = [];
export const showDialog = writable<boolean>(false);
export const line = writable<boolean>(false);
export const ui = writable<boolean>(false);
export const plansModal = writable<boolean>(false);
export const customScheduleModal = writable<boolean>(false);
export const textArea = writable<boolean>(false);
export const appointment = writable<boolean>(false);
export const projectDone = writable<boolean>(false);
export const newmessage = writable<boolean>(false);
export const dayL = writable<number>(0);
export const part = writable<number>(0);
export const plans_layout_modal = writable<boolean>(false);
export const add_payment_method = writable<boolean>(false);
