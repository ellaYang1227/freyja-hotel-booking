<script setup lang="ts">
</script>

<template>
    <div class="bg-white">
        <div class="container-fluid d-grid gap-6">
            <div>
                <h1 class="px-2 text-white bg-primary text-uppercase">Color System</h1>
                <div class="d-grid gap-3 my-3">
                    <!-- primary -->
                    <div class="d-flex gap-3">
                        <div class="color-card bg-primary-120 text-white">
                            <strong>$primary-120 (Dark)</strong>
                            <span class="text-subtitle">Hex #7B6651</span>
                            <span class="text-subtitle">RGB 123, 102, 81</span>
                        </div>
                        <div class="color-card bg-primary text-white">
                            <strong>$primary (Base)</strong>
                            <span class="text-subtitle">Hex #BF9D7D</span>
                            <span class="text-subtitle">RGB 191, 157, 125</span>
                        </div>
                        <div class="color-card bg-primary-80">
                            <strong>$primary-80</strong>
                            <span class="text-subtitle">Hex #D0B79F</span>
                            <span class="text-subtitle">RGB 208, 183, 159</span>
                        </div>
                        <div class="color-card bg-primary-60">
                            <strong>$primary-60</strong>
                            <span class="text-subtitle">Hex #E1D1C2</span>
                            <span class="text-subtitle">RGB 225, 209, 194</span>
                        </div>
                        <div class="color-card bg-primary-40">
                            <strong>$primary-40</strong>
                            <span class="text-subtitle">Hex #F1EAE4</span>
                            <span class="text-subtitle">RGB 241, 234, 228</span>
                        </div>
                        <div class="color-card bg-primary-10">
                            <strong>$primary-10</strong>
                            <span class="text-subtitle">Hex #F7F2EE</span>
                            <span class="text-subtitle">RGB 247, 242, 238</span>
                        </div>
                        <div class="color-card bg-primary-tint">
                            <strong>$primary-tint</strong>
                            <span class="text-subtitle">Hex #FAF7F5</span>
                            <span class="text-subtitle">RGB 250, 247, 245</span>
                        </div>
                    </div>
                    <!-- success -->
                    <div class="d-flex gap-3">
                        <div class="color-card bg-success-120 text-white">
                            <strong>$success-120 (Dark)</strong>
                            <span class="text-subtitle">Hex #299F65</span>
                            <span class="text-subtitle">RGB 41, 159, 101</span>
                        </div>
                        <div class="color-card bg-success text-white">
                            <strong>$success (Base)</strong>
                            <span class="text-subtitle">Hex #52DD7E</span>
                            <span class="text-subtitle">RGB 82, 221, 126</span>
                        </div>
                        <div class="color-card bg-success-20">
                            <strong>$success-20</strong>
                            <span class="text-subtitle">Hex #BCFBBD</span>
                            <span class="text-subtitle">RGB 188, 251, 189</span>
                        </div>
                        <div class="color-card bg-success-10">
                            <strong>$success-10</strong>
                            <span class="text-subtitle">Hex #E8FEE7</span>
                            <span class="text-subtitle">RGB 232, 254, 231</span>
                        </div>
                    </div>
                    <!-- info -->
                    <div class="d-flex gap-3">
                        <div class="color-card bg-info-120 text-white">
                            <strong>$info-120 (Dark)</strong>
                            <span class="text-subtitle">Hex #1D66AC</span>
                            <span class="text-subtitle">RGB 29, 102, 172</span>
                        </div>
                        <div class="color-card bg-info text-white">
                            <strong>$info (Base)</strong>
                            <span class="text-subtitle">Hex #DA3E51</span>
                            <span class="text-subtitle">RGB 218, 62, 81</span>
                        </div>
                        <div class="color-card bg-info-20">
                            <strong>$info-20</strong>
                            <span class="text-subtitle">Hex #F5CCD1</span>
                            <span class="text-subtitle">RGB 245, 204, 209</span>
                        </div>
                        <div class="color-card bg-info-10">
                            <strong>$info-10</strong>
                            <span class="text-subtitle">Hex #FDECEF</span>
                            <span class="text-subtitle">RGB 252, 236, 239</span>
                        </div>
                    </div>
                    <!-- error -->
                    <div class="d-flex gap-3">
                        <div class="color-card bg-error-120 text-white">
                            <strong>$error-120 (Dark)</strong>
                            <span class="text-subtitle">Hex #C22538</span>
                            <span class="text-subtitle">RGB 194, 37, 56</span>
                        </div>
                        <div class="color-card bg-error text-white">
                            <strong>$error (Base)</strong>
                            <span class="text-subtitle">Hex #DA3E51</span>
                            <span class="text-subtitle">RGB 218, 62, 81</span>
                        </div>
                        <div class="color-card bg-error-20">
                            <strong>$error-20</strong>
                            <span class="text-subtitle">Hex #F5CCD1</span>
                            <span class="text-subtitle">RGB 245, 204, 209</span>
                        </div>
                        <div class="color-card bg-error-10">
                            <strong>$error-10</strong>
                            <span class="text-subtitle">Hex #FDECEF</span>
                            <span class="text-subtitle">RGB 252, 236, 239</span>
                        </div>
                    </div>
                    <!-- neutral -->
                    <div class="d-flex gap-3">
                        <div class="color-card bg-neutral-bg text-white">
                            <strong>$neutral-bg</strong>
                            <span class="text-subtitle">Hex #140F0A</span>
                            <span class="text-subtitle">RGB 20, 15, 10</span>
                        </div>
                        <div class="color-card bg-neutral text-white">
                            <strong>$neutral / $black</strong>
                            <span class="text-subtitle">Hex #000000</span>
                            <span class="text-subtitle">RGB 0, 0, 0</span>
                        </div>
                        <div class="color-card bg-neutral-80 text-white">
                            <strong>$neutral-80</strong>
                            <span class="text-subtitle">Hex #4B4B4B</span>
                            <span class="text-subtitle">RGB 2, 46, 179</span>
                        </div>
                        <div class="color-card bg-neutral-60 text-white">
                            <strong>$neutral-60</strong>
                            <span class="text-subtitle">Hex #909090</span>
                            <span class="text-subtitle">RGB 144, 144, 144</span>
                        </div>
                        <div class="color-card bg-neutral-40">
                            <strong>$neutral-40</strong>
                            <span class="text-subtitle">Hex #ECECEC</span>
                            <span class="text-subtitle">RGB 236, 236, 236</span>
                        </div>
                        <div class="color-card bg-neutral-10">
                            <strong>$neutral-10</strong>
                            <span class="text-subtitle">Hex #F9F9F9</span>
                            <span class="text-subtitle">RGB 249, 249, 249</span>
                        </div>
                        <div class="color-card bg-neutral-0">
                            <strong>$neutral-0 / $white</strong>
                            <span class="text-subtitle">Hex #FFFFFF</span>
                            <span class="text-subtitle">RGB 255, 255, 255</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 class="px-2 text-white bg-primary text-uppercase">typography</h1>
                <div class="d-grid gap-2">
                    <div class="display-1">Display Heading 100px B</div>
                    <h1>h1. Bootstrap heading</h1>
                    <div class="h1">h1. Bootstrap heading</div>
                    <h2>h2. Bootstrap heading</h2>
                    <div class="h2">h2. Bootstrap heading</div>
                    <h3>h3. Bootstrap heading</h3>
                    <div class="h3">h3. Bootstrap heading</div>
                    <h4>h4. Bootstrap heading</h4>
                    <div class="h4">h4. Bootstrap heading</div>
                    <h5>h5. Bootstrap heading</h5>
                    <div class="h5">h5. Bootstrap heading</div>
                    <h6>h6. Bootstrap heading</h6>
                    <div class="h6">h6. Bootstrap heading</div>
                    <div class="text-title">Title 16px B</div>
                    <div class="text-subtitle">Subtitle 14px B</div>
                    <div class="text-body">Body 16px R</div>
                    <div class="text-body2">Body2 14px R</div>
                    <div class="text-tiny">Tiny 12px R</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.color-card {
    width: 180px;
    height: 120px;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>