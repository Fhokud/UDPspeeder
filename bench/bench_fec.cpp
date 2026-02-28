#include "nanobench.h"
#include "bench_common.h"
#include "lib/rs.h"
#include <cstdlib>
#include <cstring>
#include <string>

static void fill_random(char *buf, int sz) {
    for (int i = 0; i < sz; i++)
        buf[i] = (char)(rand() & 0xFF);
}

void register_fec_benchmarks(void *bench_ptr) {
    auto &bench = *static_cast<ankerl::nanobench::Bench *>(bench_ptr);

    /* GF tables are initialized inside fec_new; force init via a dummy allocation */
    { void *d = fec_new(2, 3); fec_free(d); }

    /* --- addmul1 microbenchmarks --- */
    for (int i = 0; i < bench_sizes_count; i++) {
        int sz = (int)bench_sizes[i];
        std::string name = "addmul1/" + std::to_string(sz) + "B";

        bench.run(name, [sz]() {
            static gf dst[1500], src[1500];
            bench_addmul1(dst, src, 0x53, sz);
            ankerl::nanobench::doNotOptimizeAway(dst[0]);
        });
    }

    /* --- rs_encode2 --- */
    struct { int k; int n; const char *label; } encode_configs[] = {
        {5, 8, "5/8"}, {10, 15, "10/15"}
    };

    for (auto &cfg : encode_configs) {
        std::string name = std::string("rs_encode/k") + cfg.label + "/1500B";
        int k = cfg.k, n = cfg.n;

        /* Pre-allocate outside the timed loop */
        char **data = (char **)calloc(n, sizeof(char *));
        for (int j = 0; j < n; j++) {
            data[j] = (char *)calloc(1, 1500);
        }
        for (int j = 0; j < k; j++)
            fill_random(data[j], 1500);

        bench.run(name, [k, n, data]() {
            rs_encode2(k, n, data, 1500);
            ankerl::nanobench::doNotOptimizeAway(data[k][0]);
        });

        for (int j = 0; j < n; j++) free(data[j]);
        free(data);
    }

    /* --- rs_encode2 MT --- */
    for (int threads : {2, 4}) {
        fec_set_threads(threads);
        for (auto &cfg : encode_configs) {
            std::string name = std::string("rs_encode_mt") + std::to_string(threads) +
                "/k" + cfg.label + "/1500B";
            int k = cfg.k, n = cfg.n;

            char **data = (char **)calloc(n, sizeof(char *));
            for (int j = 0; j < n; j++)
                data[j] = (char *)calloc(1, 1500);
            for (int j = 0; j < k; j++)
                fill_random(data[j], 1500);

            bench.run(name, [k, n, data]() {
                rs_encode2(k, n, data, 1500);
                ankerl::nanobench::doNotOptimizeAway(data[k][0]);
            });

            for (int j = 0; j < n; j++) free(data[j]);
            free(data);
        }
    }
    fec_set_threads(1);

    /* --- rs_decode2 --- */
    for (auto &cfg : encode_configs) {
        std::string name = std::string("rs_decode/k") + cfg.label + "/1500B";
        int k = cfg.k, n = cfg.n;
        int redundant = n - k;

        /* Prepare encoded data once */
        char **orig = (char **)calloc(n, sizeof(char *));
        for (int j = 0; j < n; j++)
            orig[j] = (char *)calloc(1, 1500);
        for (int j = 0; j < k; j++)
            fill_random(orig[j], 1500);
        rs_encode2(k, n, orig, 1500);

        /* Working copy for each decode iteration */
        char **data = (char **)calloc(n, sizeof(char *));
        char **bufs = (char **)calloc(n, sizeof(char *));
        for (int j = 0; j < n; j++)
            bufs[j] = (char *)calloc(1, 1500);

        bench.run(name, [k, n, redundant, orig, data, bufs]() {
            /* Reset working copy from originals */
            for (int j = 0; j < n; j++)
                memcpy(bufs[j], orig[j], 1500);

            /* Simulate losing the first 'redundant' data packets */
            for (int j = 0; j < n; j++)
                data[j] = (j < redundant) ? NULL : bufs[j];

            rs_decode2(k, n, data, 1500);
            ankerl::nanobench::doNotOptimizeAway(data[0][0]);
        });

        for (int j = 0; j < n; j++) { free(orig[j]); free(bufs[j]); }
        free(orig); free(data); free(bufs);
    }

    /* --- rs_decode2 MT --- */
    for (int threads : {2, 4}) {
        fec_set_threads(threads);
        for (auto &cfg : encode_configs) {
            std::string name = std::string("rs_decode_mt") + std::to_string(threads) +
                "/k" + cfg.label + "/1500B";
            int k = cfg.k, n = cfg.n;
            int redundant = n - k;

            char **orig = (char **)calloc(n, sizeof(char *));
            for (int j = 0; j < n; j++)
                orig[j] = (char *)calloc(1, 1500);
            for (int j = 0; j < k; j++)
                fill_random(orig[j], 1500);
            fec_set_threads(1);  /* encode single-threaded for clean baseline */
            rs_encode2(k, n, orig, 1500);
            fec_set_threads(threads);

            char **data2 = (char **)calloc(n, sizeof(char *));
            char **bufs2 = (char **)calloc(n, sizeof(char *));
            for (int j = 0; j < n; j++)
                bufs2[j] = (char *)calloc(1, 1500);

            bench.run(name, [k, n, redundant, orig, data2, bufs2]() {
                for (int j = 0; j < n; j++)
                    memcpy(bufs2[j], orig[j], 1500);
                for (int j = 0; j < n; j++)
                    data2[j] = (j < redundant) ? NULL : bufs2[j];
                rs_decode2(k, n, data2, 1500);
                ankerl::nanobench::doNotOptimizeAway(data2[0][0]);
            });

            for (int j = 0; j < n; j++) { free(orig[j]); free(bufs2[j]); }
            free(orig); free(data2); free(bufs2);
        }
    }
    fec_set_threads(1);
}
