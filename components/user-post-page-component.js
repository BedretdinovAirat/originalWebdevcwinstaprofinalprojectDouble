// 18:55, 21:20 - 01.08
import { posts, goToPage } from "../index.js";
import { USER_POSTS_PAGE } from "../routes.js";
export function renderUserPostPageComponent({ appEl }) {
  const userPostHTML = posts
    .map((post) => {
      return `<li class="post">
                    <div class="post-header" data-user-id="${id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${id}" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.createdAt}
                    </p>
                  </li>`;
    })
    .join("");
  const appHtml = `<div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${userPostHTML}
                </ul>
              </div>`;
  appEl.innerHTML = appHtml;
  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
