import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, setAndDeleteLike, getToken } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { deletePost } from "/api.js";
// актуальный код
export function renderPostsPageComponent({ appEl }) {
  console.log("1,2,3,");
  // TODO: реализовать рендер постов из api
  // начал писать код 6 часов
  console.log("Актуальный список постов:", posts);
  const postsHTML = posts
    .map((post) => {
      const createDate = formatDistanceToNow(new Date(post.createdAt), {
        locale: ru,
      });
      const likeMassiveUser =
        post.likes.length === 0
          ? 0
          : `${
              post.likes.length === 1
                ? post.likes[0].name
                : `${post.likes[post.likes.length - 1].name} и ещё ${
                    post.likes.length - 1
                  }`
            }`;
      return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${
                          post.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src=${
                          post.isLiked
                            ? "./assets/images/like-active.svg"
                            : "./assets/images/like-not-active.svg"
                        }>
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${likeMassiveUser}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${createDate}
                    </p>
                    <button class="delete-button"data-post-id="${
                      post.id
                    }" id="delete-button">Удалить</button>
                  </li>`;
    })
    .join("");
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHTML}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      setAndDeleteLike({ postId: likeEl.dataset.postId });
    });
  }
  for (let deleteButtonElement of document.querySelectorAll(".delete-button")) {
    deleteButtonElement.addEventListener("click", () => {
      const postId = deleteButtonElement.dataset.postId;
      deletePost({
        postId: postId,
        token: getToken(),
      });
    });
  }
}
