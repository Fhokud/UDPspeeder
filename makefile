cc_cross=/home/wangyu/Desktop/arm-2014.05/bin/arm-none-linux-gnueabi-g++
cc_local=g++
cc_mips24kc_be=/toolchains/lede-sdk-17.01.2-ar71xx-generic_gcc-5.4.0_musl-1.1.16.Linux-x86_64/staging_dir/toolchain-mips_24kc_gcc-5.4.0_musl-1.1.16/bin/mips-openwrt-linux-musl-g++
cc_mips24kc_le=/toolchains/lede-sdk-17.01.2-ramips-mt7621_gcc-5.4.0_musl-1.1.16.Linux-x86_64/staging_dir/toolchain-mipsel_24kc_gcc-5.4.0_musl-1.1.16/bin/mipsel-openwrt-linux-musl-g++
cc_arm= /toolchains/lede-sdk-17.01.2-bcm53xx_gcc-5.4.0_musl-1.1.16_eabi.Linux-x86_64/staging_dir/toolchain-arm_cortex-a9_gcc-5.4.0_musl-1.1.16_eabi/bin/arm-openwrt-linux-c++
cc_mingw_cross=i686-w64-mingw32-g++-posix
cc_mingw64_cross=x86_64-w64-mingw32-g++-posix
cc_mac_cross=o64-clang++ -stdlib=libc++
cc_x86=/toolchains/lede-sdk-17.01.2-x86-generic_gcc-5.4.0_musl-1.1.16.Linux-x86_64/staging_dir/toolchain-i386_pentium4_gcc-5.4.0_musl-1.1.16/bin/i486-openwrt-linux-c++
cc_amd64=/toolchains/lede-sdk-17.01.2-x86-64_gcc-5.4.0_musl-1.1.16.Linux-x86_64/staging_dir/toolchain-x86_64_gcc-5.4.0_musl-1.1.16/bin/x86_64-openwrt-linux-c++
#cc_bcm2708=/home/wangyu/raspberry/tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian/bin/arm-linux-gnueabihf-g++ 


SOURCES0_PORTABLE=main.cpp log.cpp common.cpp lib/fec.cpp lib/rs.cpp packet.cpp packet_cook.cpp delay_manager.cpp fd_manager.cpp connection.cpp fec_manager.cpp misc.cpp tunnel_client.cpp tunnel_server.cpp io_uring_recv.cpp win_iocp_recv.cpp win_rio.cpp send_slab.cpp
SOURCES0=${SOURCES0_PORTABLE} xor_spe.S
SOURCES=${SOURCES0} my_ev.cpp -isystem libev
NAME=speederv2


FLAGS= -std=c++11   -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -MMD -MP ${OPT}

ifdef SPE
FLAGS += -DHAVE_PPC_SPE -Wa,-mspe
endif

TARGETS=amd64 arm mips24kc_be x86  mips24kc_le

TAR=${NAME}_binaries.tar.gz `echo ${TARGETS}|sed -r 's/([^ ]+)/${NAME}_\1/g'` version.txt

export STAGING_DIR=/tmp/    #just for supress warning of staging_dir not define

# targets for nativei (non-cross) compile 
all:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb -static -O2

freebsd:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb -static -O2

mingw:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS}  -ggdb -static -O2 -lws2_32

mingw_wepoll:git_version    #to compile you need a pacthed version of libev with wepoll backend
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES0} ${FLAGS}  -ggdb -static -O2   -DNO_LIBEV_EMBED -D_WIN32 -lev -lws2_32 

mac:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS}  -ggdb -O2

cygwin:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb -static -O2 -D_GNU_SOURCE

#targes for general cross compile

cross:git_version
	${cc_cross}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} -lrt -O2

cross2:git_version
	${cc_cross}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} -lrt -static -lgcc_eh -O2

cross3:git_version
	${cc_cross}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} -lrt -static -O2

#targets only for debug purpose
fast: git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb
debug: git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -Wformat-nonliteral -D MY_DEBUG -ggdb
debug2: git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -Wformat-nonliteral -ggdb

#targets only for 'make release'

mips24kc_be: git_version
	${cc_mips24kc_be}  -o ${NAME}_$@   -I. ${SOURCES} ${FLAGS} -lrt -lgcc_eh -static -O2

mips24kc_le: git_version
	${cc_mips24kc_le}  -o ${NAME}_$@   -I. ${SOURCES} ${FLAGS} -lrt -lgcc_eh -static -O2

amd64:git_version
	${cc_amd64}   -o ${NAME}_$@    -I. ${SOURCES} ${FLAGS} -lrt -static -O2 -lgcc_eh -ggdb

x86:git_version          #to build this you need 'g++-multilib' installed 
	${cc_x86}   -o ${NAME}_$@      -I. ${SOURCES} ${FLAGS} -lrt -static -O2 -lgcc_eh -ggdb
arm:git_version
	${cc_arm}   -o ${NAME}_$@      -I. ${SOURCES} ${FLAGS} -lrt -static -O2 -lgcc_eh


release: ${TARGETS}
	cp git_version.h version.txt
	tar -zcvf ${TAR}

#targets for cross compile windows targets on linux 

mingw_cross:git_version   #to build this and the below one you need 'mingw-w64' installed (the cross compile version on linux)
	${cc_mingw_cross}   -o ${NAME}.exe          -I. ${SOURCES} ${FLAGS}  -ggdb -static -O2 -lws2_32

mingw_cross_wepoll:git_version    #to compile you need a pacthed version of libev with wepoll backend installed
	${cc_mingw_cross}   -o ${NAME}_wepoll.exe       -I. ${SOURCES0} ${FLAGS}  -ggdb -static -O2   -DNO_LIBEV_EMBED -D_WIN32 -lev -lws2_32

#targets for cross compile macos targets on linux 

mac_cross:git_version   #need to install 'osxcross' first.
	${cc_mac_cross}   -o ${NAME}_mac          -I. ${SOURCES} ${FLAGS}  -ggdb -O2

#release2 includes all binary in 'release' plus win and mac cross compile targets

release2: ${TARGETS} mingw_cross mingw_cross_wepoll mac_cross
	cp git_version.h version.txt
	tar -zcvf ${TAR} ${NAME}.exe ${NAME}_wepoll.exe ${NAME}_mac

clean:
	rm -f ${TAR}
	rm -f ${NAME} ${NAME}_cross ${NAME}.exe ${NAME}_wepoll.exe ${NAME}_mac bench_udpspeeder.exe test_udpspeeder.exe
	rm -f git_version.h wepoll.o
	rm -f *.d bench/*.d lib/*.d crc32/*.d

-include $(wildcard *.d bench/*.d lib/*.d crc32/*.d)

git_version:
	    echo "const char *gitversion = \"$(shell git rev-parse HEAD)\";" > git_version.h

# --- Benchmark and test targets ---
BENCH_CORE=bench/bench_main.cpp bench/bench_fec.cpp bench/bench_crc32.cpp bench/bench_packet.cpp lib/fec.cpp lib/rs.cpp crc32/Crc32.cpp packet_cook.cpp
TEST_CORE=bench/test_main.cpp bench/test_fec.cpp bench/test_crc32.cpp bench/test_packet.cpp lib/fec.cpp lib/rs.cpp crc32/Crc32.cpp packet_cook.cpp
BENCH_SOURCES=${BENCH_CORE} xor_spe.S
TEST_SOURCES=${TEST_CORE} xor_spe.S
BENCH_FLAGS=-std=c++11 -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -O2 -DBENCH_EXPOSE_INTERNALS -MMD -MP

ifdef SPE
BENCH_FLAGS += -DHAVE_PPC_SPE -Wa,-mspe
endif

bench: git_version
	${cc_local} -o bench_udpspeeder -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS}

test: git_version
	${cc_local} -o test_udpspeeder -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS}
	./test_udpspeeder

bench-static: git_version
	${cc_local} -o bench_udpspeeder_static -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS} -static

test-static: git_version
	${cc_local} -o test_udpspeeder_static -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS} -static

bench-cross: git_version
	${CC} -o bench_udpspeeder_cross -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS} -static -lgcc_eh

test-cross: git_version
	${CC} -o test_udpspeeder_cross -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS} -static -lgcc_eh

all-cross: git_version
	${CC} -o ${NAME}_cross -I. ${SOURCES} ${FLAGS} -lrt -static -lgcc_eh -O2

bench-mingw: git_version
	${cc_mingw64_cross} -o bench_udpspeeder.exe -I. -Ibench ${BENCH_CORE} ${BENCH_FLAGS} -static

test-mingw: git_version
	${cc_mingw64_cross} -o test_udpspeeder.exe -I. -Ibench ${TEST_CORE} ${BENCH_FLAGS} -static

# Full tunnel binary for Win64 (select backend)
mingw64_cross: git_version
	${cc_mingw64_cross} -o ${NAME}.exe -I. -isystem libev ${SOURCES0_PORTABLE} my_ev.cpp ${FLAGS} -Wno-narrowing -ggdb -static -O2 -lws2_32

# Full tunnel binary for Win64 (wepoll/IOCP backend)
wepoll.o: wepoll.c
	x86_64-w64-mingw32-gcc-posix -c -o wepoll.o wepoll.c -O2 \
		-Depoll_create=wepoll_create -Depoll_create1=wepoll_create1 \
		-Depoll_ctl=wepoll_ctl -Depoll_wait=wepoll_wait -Depoll_close=wepoll_close

mingw64_wepoll: git_version wepoll.o
	${cc_mingw64_cross} -o ${NAME}_wepoll.exe -I. -Iwepoll_shim -isystem libev ${SOURCES0_PORTABLE} my_ev.cpp wepoll.o ${FLAGS} -Wno-narrowing -DUSE_WEPOLL -ggdb -static -O2 -lws2_32
