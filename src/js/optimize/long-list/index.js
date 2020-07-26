// 长列表优化
// 文章出处： https://juejin.im/post/5de31df76fb9a071bb7cab7b

// 期望达到的最终效果
// 提升长列表页面的性能
// 在体验上，用户无法感知你用了长列表

// 需要做到的事情
// 提升性能主要方向还是减少长列表页面的渲染节点数量，优化前是全量渲染，优化后最好只渲染用户能看到的节点，或者说越少越好
// 优化后页面有和普通长列表页面一样的滚动条反馈
// 优化后的滚动体验要非常接近原生滚动体验
// 上拉加载

(function () {
  var sourceList = generateArray(5000);

  const LOAD_EVENT = "load";

  var vm = new Vue({
    template: `
      <div ref="longList" class="long-list">
        <div ref="fragment" class="fragment"  :style="{ transform: 'translate3d(0, ' + translateY + 'px, 0)' }">
          <template v-for="item in currentViewList">
            <div :key="item.key % item.key || null">
              <div class="item">{{item.key}} - {{item.item}}</div>
            </div>
          </template>
        </div>
        <div class="footer" :style="{ paddingTop: loadingTop + 'px' }">
          <div v-if="!finished" ref="loadGuard">
            <slot name="loading">
              <div class="footer-loading">Loading......</div>
            </slot>
          </div>
          <div v-else>
            <slot name="finished">
              <div class="footer-done">没有了......</div>
            </slot>
          </div>
        </div>
      </div>
    `,
    el: "#root",
    props: {
      size: {
        type: Number,
        default: 50,
      },
    },
    data() {
      return {
        scroller: null,
        innerHeight: window.innerHeight,
        finished: false,
        loading: false,
        itemHeight: 0,
        sourceList: sourceList,
        currentViewList: [...sourceList.slice(0, this.size)],
      };
    },
    computed: {
      loadingTop() {
        return this.sourceList.length * this.itemHeight;
      },
      pageHeight() {
        return this.itemHeight * this.size;
      },
      translateY() {
        const [firstItem] = this.currentViewList;
        if (!firstItem) {
          return 0;
        }
        return this.itemHeight * firstItem.key;
      },
    },
    mounted() {
      this.$nextTick(() => {
        const scroller = (this.scroller = this.getScroller(
          this.$refs.longList
        ));
        const { innerHeight, done, pushItems } = this;
        // 异步加载
        const loadGuard = this.$refs.loadGuard;
        const loadCallback = () => {
          if (this.finished) {
            return;
          }
          const { y } = loadGuard.getBoundingClientRect();
          if (y <= innerHeight) {
            if (this.loading) {
              return;
            }
            this.loading = true;
            // TODO: 触发事件
            // this.$emit(LOAD_EVENT, { done, pushItems });
            this.handleEmit({ done, pushItems });
          }
        };
        const fragment = this.$refs.fragment;
        const fragmentCallBack = (scrollTop, isDown) => {
          const { top, bottom } = fragment.getBoundingClientRect();
          if (isDown) {
            // 向下
            if (bottom <= innerHeight) {
              this.down(scrollTop, bottom);
            }
          } else {
            // 向上
            if (top >= 0) {
              this.up(scrollTop, top);
            }
          }
        };
        let oldTop = 0;
        const scrollCallback = () => {
          const scrollTop = this.getScrollTop(scroller);
          loadCallback();
          fragmentCallBack(scrollTop, scrollTop > oldTop);
          oldTop = scrollTop;
        };
        loadCallback();
        scroller.addEventListener("scroll", scrollCallback);
        this.$once("hook:beforeDestroy", () => {
          scroller.removeEventListener("scroll", scrollCallback);
        });
      });
    },
    methods: {
      handleEmit({ done, pushItems }) {
        console.log(11);
        setTimeout(() => {
          // const { page, size, total } = this
          let page = 1,
            size = 1000,
            total = 100000;
          const maxSize = Math.min(size, total);
          const maxPage = ~~(total / maxSize) + (total % maxSize === 0 ? 0 : 1);
          const length =
            page === maxPage ? total % maxSize || maxSize : maxSize;
          const list = Array.from({ length }).map((_, i) => ({
            text: i + (page - 1) * maxSize,
          }));
          pushItems(list);
          done(page === maxPage);
          this.page++;
        }, 1000);
      },
      getScrollTop(elem) {
        return "scrollTop" in elem ? elem.scrollTop : elem.pageYOffset;
      },
      getScroller(elem) {
        while (
          (elem = elem.parentNode) &&
          elem.tagName !== "BODY" &&
          elem !== window
        ) {
          const { overflowY } = window.getComputedStyle(elem);

          if (overflowY === "scroll" || overflowY === "auto") {
            return elem;
          }
        }
        return window;
      },
      done(finished) {
        if (this.finished) {
          return;
        }
        if (finished === true) {
          this.finished = finished;
        }
        const { size, sourceList, currentViewList } = this;
        const length = currentViewList.length;
        if (length === 0) {
          this.currentViewList = [...sourceList.slice(0, size)];
          this.$nextTick().then(() => {
            this.itemHeight = this.$refs.fragment.children[0].offsetHeight;
            this.loading = false;
          });
        } else if (length === size) {
          this.currentViewList.push(...sourceList.slice(size, size * 2));
          this.loading = false;
        } else {
          // 已经触发了加载，但还没加载完成时，向上滚动了
          if (this.isLoadingView()) {
            const lastKey = currentViewList[length - 1].key;
            this.currentViewList = [
              ...currentViewList.slice(size, size * 2),
              ...sourceList.slice(lastKey + 1, lastKey + 1 + size),
            ];
          }
          this.loading = false;
        }
      },
      // 向下滚动
      down(scrollTop, y) {
        const { size, currentViewList } = this;
        const currentLength = currentViewList.length;
        if (currentLength < size) {
          return;
        }
        const { sourceList } = this;
        if (currentLength === size) {
          this.currentViewList.push(...sourceList.slice(size, size * 2));
          return;
        }
        const length = sourceList.length;
        const lastKey = currentViewList[currentLength - 1].key;
        if (lastKey >= length - 1) {
          return;
        }
        let startPoint;
        const { pageHeight } = this;
        if (y < 0) {
          // 处理快速滚动
          const page =
            (scrollTop - (scrollTop % pageHeight)) / pageHeight +
            (scrollTop % pageHeight === 0 ? 0 : 1) -
            1;
          startPoint = Math.min(page * size, length - size * 2);
        } else {
          startPoint = currentViewList[size].key;
        }
        this.currentViewList = sourceList.slice(
          startPoint,
          startPoint + size * 2
        );
      },
      // 向上滚动
      up(scrollTop, y) {
        const { size, currentViewList } = this;
        const currentLength = currentViewList.length;
        if (currentLength < size) {
          return;
        }
        const firstKey = currentViewList[0].key;
        if (firstKey === 0) {
          return;
        }
        let startPoint;
        const { sourceList, innerHeight, pageHeight } = this;
        if (y > innerHeight) {
          // 处理快速滚动
          const page =
            (scrollTop - (scrollTop % pageHeight)) / pageHeight +
            (scrollTop % pageHeight === 0 ? 0 : 1) -
            1;
          startPoint = Math.max(page * size, 0);
        } else {
          startPoint = currentViewList[0].key - size;
        }
        this.currentViewList = sourceList.slice(
          startPoint,
          startPoint + size * 2
        );
      },
      pushItems(items) {
        const length = this.sourceList.length;
        const normalizedItems = items.map((item, index) => {
          return {
            key: length + index,
            item,
          };
        });
        this.sourceList = this.sourceList.concat(normalizedItems);
      },
      isLoadingView() {
        return (
          this.$refs.loadGuard.getBoundingClientRect().y <= this.innerHeight
        );
      },
    },
  });

  /**
   * 工具函数
   * @param {number} n
   */
  function generateArray(n = 1000) {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push({
        key: i,
        item: `zo11o${Math.floor(Math.random() * 999999999)}`,
      });
    }
    return result;
  }
})();
