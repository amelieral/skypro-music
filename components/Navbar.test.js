import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Nav from "./Navbar.vue";

describe("Nav", () => {
  it("рендерит логотип и пункты меню", () => {
    const wrapper = mount(Nav, {
      global: {
        stubs: {
          NuxtLink: { template: "<a><slot /></a>" },
          NuxtImg: { template: "<img />" },
        },
      },
    });

    expect(wrapper.find(".nav__logo").exists()).toBe(true);
    expect(wrapper.findAll(".menu__item").length).toBe(3);
  });

  it("по умолчанию меню закрыто", () => {
    const wrapper = mount(Nav, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    });

    const menu = wrapper.find(".nav__menu");
    expect(menu.classes()).not.toContain("menu--open");
  });

  it("открывает меню при клике на бургер", async () => {
    const wrapper = mount(Nav, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    });

    const burger = wrapper.find(".nav__burger");
    await burger.trigger("click");

    expect(wrapper.find(".nav__menu").classes()).toContain("menu--open");
  });

  it("закрывает меню при повторном клике на бургер", async () => {
    const wrapper = mount(Nav, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    });

    const burger = wrapper.find(".nav__burger");

    await burger.trigger("click");
    expect(wrapper.find(".nav__menu").classes()).toContain("menu--open");

    await burger.trigger("click");
    expect(wrapper.find(".nav__menu").classes()).not.toContain("menu--open");
  });
});