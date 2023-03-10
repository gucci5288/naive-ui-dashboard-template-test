import type { VNode } from 'vue';
import { defineComponent , Suspense } from 'vue'
import { NSpin } from 'naive-ui'

import type { RouteLocation} from 'vue-router';
import { RouterView } from 'vue-router'
const $RouterView = defineComponent({
  setup() {
    return () => (
      <RouterView>
        {{
          default({ Component }: { Component: VNode; route: RouteLocation }) {
            return (
              <Suspense>
                {{
                  default: () => Component,

                  fallback() {
                    return () => (
                      <div class="fixed left-1/2 top-1/2 transform text-primary-default -translate-y-1/2 -translate-x-1/2">
                        <NSpin strokeWidth={14} />
                      </div>
                    )
                  },
                }}
              </Suspense>
            )
          },
        }}
      </RouterView>
    )
  },
})
export default $RouterView
