---
title: 面试复习每日练习
type: guide
tags: [面试, 练习题, 复习, 打卡]
created: 2026-07-01
updated: 2026-07-06
status: ongoing
---

# 面试复习每日练习

> 每天打卡完毕后更新题库（新增当天知识点题目），并生成一份新的今日练习。
> 题目覆盖所有已复习过的 Day，每天随机抽取 15 题左右，确保每次做的不一样。
> 做完后在每题后面标注 ✅全对 / ⚠️部分对 / ❌不会，方便追踪薄弱点。

---

## 今日练习（Day 16 — 2026-07-06）

> 第十六章·面试实战经典题（8题）。做完后在括号里自评：✅ / ⚠️ / ❌

### 一、选择题（每题只有一个正确答案）

**D16-01** MySQL 一条 UPDATE 语句执行时，以下哪个日志是"物理日志"，记录"哪个数据页改了什么"？
A. binlog
B. redo log
C. undo log
D. slow log

你的答案：( )

---

**D16-02** BIO、NIO、AIO 三种模型中，NIO 的核心机制是什么？
A. 一连接一线程
B. Selector 多路复用，一个线程管理多个连接
C. 操作系统完成 IO 后回调
D. 内核态线程直接处理

你的答案：( )

---

**D16-03** Java 反射中，`Method.invoke()` 的性能优化机制叫什么？
A. JIT 编译
B. Inflation 机制（前15次native，之后ASM生成字节码）
C. 内联缓存
D. 方法句柄

你的答案：( )

---

**D16-04** JDK 21 虚拟线程（Virtual Thread）的调度方式是什么？
A. 1:1 映射 OS 线程
B. N:1 映射，多个虚拟线程跑在一个 OS 线程上
C. M:N 映射，多个虚拟线程跑在少量载体线程上，IO阻塞时自动卸载
D. 完全由操作系统调度

你的答案：( )

---

### 二、填空题

**D16-05** MySQL UPDATE 执行流程中，redo log 先写 ______ 状态，binlog 写完后再改为 ______ 状态，这就是两阶段提交。

你的答案：( )

---

**D16-06** BIO 是 ______ 阻塞，NIO 是 ______ 非阻塞 + IO 多路复用，AIO 是异步非阻塞。

你的答案：( )

---

**D16-07** DDD 战略设计的核心是划分 ______，战术设计的核心概念包括实体、值对象、______、领域服务、仓储。

你的答案：( )

---

**D16-08** AI Coding 适用业务的判断三要素：需求 ______、有 ______ 手段、单次改动上下文可控。

你的答案：( )

---

### 三、简答题（写关键词即可）

**D16-09** 一条 UPDATE 的 SQL 在 MySQL 中的完整执行流程是什么？（要求提到 server 层、引擎层、三本日志、两阶段提交）

你的答案：( )

---

**D16-10** BIO、NIO、AIO 的区别是什么？为什么 NIO 能"一个线程管万连接"？AIO 在 Linux 为什么用得少？

你的答案：( )

---

**D16-11** Java 反射的原理是什么？`Method.invoke()` 底层是怎么实现的？如何优化反射性能？

你的答案：( )

---

**D16-12** 虚拟线程（JDK 21）的核心机制是什么？使用时有哪些注意事项（至少说3个）？

你的答案：( )

---

## 今日练习（Day 11 — 2026-07-06）

> 从 Day 3～11 的题库中抽取。做完后在括号里自评：✅ / ⚠️ / ❌

### 一、选择题（每题只有一个正确答案）

**D11-01** @SpringBootApplication 等价于以下哪三个注解的组合？
A. @Configuration + @ComponentScan + @EnableAutoConfiguration
B. @SpringBootConfiguration + @ComponentScan + @EnableAutoConfiguration
C. @BootConfiguration + @BeanScan + @Autowired
D. @SpringBootConfiguration + @EnableWebMvc + @ComponentScan

你的答案：( )

---

**D11-05** 同一个 Service 类中，方法 A 调用方法 B，B 上有 @Transactional，B 的事务是否生效？
A. 生效
B. 不生效，因为是 this 调用绕过代理
C. 取决于 A 是否有事务
D. 取决于传播级别

你的答案：( )

---

**D4-03** 类加载的"双亲委派"是指？
A. 父类委托子类加载
B. 子类先委托父类加载，父类加载不到才自己加载
C. 每个类只能被加载一次
D. 通过父类的 ClassLoader 加载

你的答案：( )

---

**D7-02** 聚簇索引的叶子节点存的是什么？
A. 主键 ID
B. 整行数据
C. 物理地址 ROWID
D. 索引列值 + 主键

你的答案：( )

---

**D8-03** next-key lock 等于？
A. 只有记录锁
B. 只有间隙锁
C. 记录锁 + 间隙锁
D. 表锁

你的答案：( )

---

**D6-03** CAS 的 ABA 问题怎么解决？
A. 加 synchronized
B. 用 AtomicStampedReference 加版本号
C. 增加自旋次数
D. 用 volatile

你的答案：( )

---

### 二、填空题

**D11-06** @EnableAutoConfiguration 通过 @Import(\_\_\_\_\_) 去读取 spring.factories 中的候选自动配置类。

你的答案：( )

---

**D11-09** @Transactional 底层通过 AOP 动态代理，事务拦截器叫 \_\_\_\_\_\_\_\_，方法前开启事务，正常结束 commit，异常 rollback。

你的答案：( )

---

**D5-06** 排查死锁的命令：先用 \_\_查看 Java 进程 ID，再用 \_\_打印线程栈信息。

你的答案：( )

---

**D7-07** 最左前缀原则：联合索引 (a, b, c)，查询条件必须从 \_\_列开始，跳过左边列则索引 \_\_。

你的答案：( )

---

**D9-08** Redis 过期删除策略是\_\_删除（访问时检查）+\_\_删除（后台定时抽查）。

你的答案：( )

---

**D3-06** HashMap 定位槽位的公式是 `index = (n - 1) & hash(key)`，这里用 \_\_运算代替取模，效率更高。

你的答案：( )

---

### 三、简答题（写关键词即可，不用写完整话术）

**D11-11** Spring Boot 自动配置的完整链路是什么？

你的答案：( )

---

**D11-13** @Transactional 哪些情况下会失效？至少说 4 个。

你的答案：( )

---

**D5-09** synchronized 和 ReentrantLock 有什么区别？生产环境怎么选？

你的答案：( )

---

**D8-12** 慢 SQL 排查流程是什么？

你的答案：( )

---

## 今日练习（Day 10 — 2026-07-02）

> 从 Day 3～9 的题库中抽取。做完后在括号里自评：✅ / ⚠️ / ❌

### 一、选择题（每题只有一个正确答案）

**D5-02** CallerRunsPolicy 拒绝策略的行为是？
A. 抛异常
B. 丢弃任务
C. 由提交任务的线程自己执行
D. 丢弃最老的任务

你的答案：( )

---

**D6-02** AQS 中 state 的含义由谁定义？
A. AQS 框架固定
B. 子类自定义
C. 操作系统
D. JVM

你的答案：( )

---

**D7-03** 以下哪种情况会触发回表？
A. 通过主键查整行
B. 通过普通索引查 SELECT *
C. 查询字段全部在索引中
D. 通过主键查部分字段

你的答案：( )

---

**D9-01** Redis 的 IO 多路复用在 Linux 下底层用的是哪个系统调用？
A. select
B. poll
C. epoll
D. read

你的答案：( )

---

**D9-02** Redis 6+ 引入了多线程，以下哪个操作仍然在主线程单线程执行？
A. 网络 Socket 数据的读写
B. 大 Key 的异步删除
C. 命令的解析和执行
D. AOF 文件的 fsync

你的答案：( )

---

**D9-03** Redis 混合持久化（RDB + AOF）是什么时候引入的？
A. Redis 3.0
B. Redis 4.0
C. Redis 5.0
D. Redis 6.0

你的答案：( )

---

**D9-04** 纯缓存场景（所有 key 都可以丢），最推荐用哪个内存淘汰策略？
A. noeviction
B. volatile-lru
C. allkeys-lru
D. volatile-ttl

你的答案：( )

---

### 二、填空题

**D3-07** HashMap 扩容时，阈值 = 数组容量 × \_\_\_。JDK8 采用 \_\_\_插法避免多线程环形链表。

你的答案：( )

---

**D4-05** JVM 运行时数据区中，线程共享的是 \_\_\_和 \_\_\_，线程私有的是程序计数器、虚拟机栈和本地方法栈。

你的答案：( )

---

**D6-05** AQS 的核心公式：AQS = \_\_\_ + \_\_\_队列。

你的答案：( )

---

**D8-08** MVCC 的两个核心组件：\_\_\_log 保存历史版本，\_\_\_判断哪个版本对当前事务可见。

你的答案：( )

---

**D9-05** Redis 快的三个核心原因：\_\_\_操作（纳秒级）、\_\_\_多路复用（一个线程监听万连接）、\_\_\_无锁设计（避免锁竞争）。

你的答案：( )

---

**D9-06** AOF 的三种同步策略中，`everysec` 模式最多丢失 \_\_\_秒数据。RDB 是定期\_\_\_（全量快照），恢复速度快但可能丢数分钟数据。

你的答案：( )

---

### 三、简答题（写关键词即可，不用写完整话术）

**D5-09** synchronized 和 ReentrantLock 有什么区别？生产环境怎么选？

你的答案：( )

---

**D7-09** 什么是覆盖索引？它为什么能提升查询性能？

你的答案：( )

---

**D9-07** Redis 过期删除策略是什么？为什么用"惰性 + 定期"组合？

你的答案：( )

---

**D9-08** LRU 和 LFU 的区别是什么？什么时候选 LFU？

你的答案：( )

---

**D9-09** Redis 有哪 5 种基本数据结构？分别举一个使用场景。

你的答案：( )

---

---

## 题库（Day 3～8）

> 每个知识点用 `[D3-01]` 这样的编号追踪。做完练习后标注状态：⬜未做 / ✅做对 / ⚠️部分对 / ❌不会
> 每次更新"今日练习"时从这里抽取，尽量不重复上次抽过的题。

### Day 3 — Java 基础与集合

#### 选择题

- `[D3-01]` HashMap 链表转红黑树需要同时满足哪两个条件？ → A（链表≥8 且 数组≥64）
- `[D3-02]` HashMap 默认初始容量和负载因子分别是？
  A. 8 和 0.5 / B. 16 和 0.75 / C. 32 和 0.75 / D. 16 和 0.5 → B
- `[D3-03]` 重写 equals 但不重写 hashCode，把对象放入 HashMap 会怎样？
  A. 编译报错 / B. 能放入但 get 可能找不到 / C. 完全没问题 / D. 抛 ClassCastException → B
- `[D3-04]` volatile 能保证以下哪个特性？
  A. 原子性 / B. 可见性 / C. 有序性 / D. 可见性和原子性 → B
- `[D3-05]` 以下哪个场景优先选择 ArrayList 而不是 LinkedList？
  A. 频繁在头部插入 / B. 频繁按索引随机访问 / C. 频繁在中间删除 / D. 频繁在尾部插入且需迭代器 → B

#### 填空题

- `[D3-06]` HashMap 定位槽位的公式是 `index = (n - 1) & hash(key)`，这里用 \_\_运算代替取模，效率更高。→ 位与
- `[D3-07]` HashMap 扩容时，阈值 = 数组容量 × \_\_。JDK8 采用 \_\_插法避免多线程环形链表。→ 负载因子（0.75）/ 尾
- `[D3-08]` volatile 通过 \_\_屏障实现：写操作刷回主存，读操作不走 CPU 缓存。→ 内存
- `[D3-09]` volatile 解决的是变量在多线程间的 \_\_问题，ThreadLocal 解决的是每个线程拥有 \_\_的问题。→ 可见 / 自己独立的副本（隔离）

#### 简答题

- `[D3-10]` HashMap put 方法的完整流程是什么？
  > 计算 hash → 定位槽位 → 空则直接放入 → 有链表则遍历（hash+equals）→ 找到则覆盖 → 没找到则尾插 → 链表≥8且数组≥64则树化 → 超过阈值则扩容
- `[D3-11]` ConcurrentHashMap JDK8 的线程安全是怎么实现的？
  > 空槽位用 CAS 插入；CAS 失败说明有竞争，锁住头节点（synchronized）后操作；扩容时多线程协助迁移数据。
- `[D3-12]` 为什么重写 equals 必须同时重写 hashCode？
  > HashMap 先用 hashCode 定位槽位，再用 equals 精确匹配。如果两个 equals 相等的对象 hashCode 不同，会被放到不同槽位，导致 get 找不到。约定：equals 相等 → hashCode 必须相等。

---

### Day 4 — JVM

#### 选择题

- `[D4-01]` 对象优先分配在 JVM 堆的哪个区域？ → B（Eden 区）
- `[D4-02]` Full GC 的触发条件不包括以下哪个？
  A. 老年代满 / B. Eden 区满 / C. 元空间满 / D. System.gc() → B（Eden 满触发 Minor GC）
- `[D4-03]` 类加载的"双亲委派"是指？
  A. 父类委托子类加载 / B. 子类先委托父类加载，父类加载不到才自己加载 / C. 每个类只能被加载一次 / D. 通过父类的 ClassLoader 加载 → B
- `[D4-04]` 以下哪个不属于 GC Roots？
  A. 栈帧中的局部变量 / B. 静态变量 / C. 常量池中的引用 / D. 堆中的实例变量 → D

#### 填空题

- `[D4-05]` JVM 运行时数据区中，线程共享的是 \_\_和 \_\_，线程私有的是 \_\_、\_\_和 \_\_。→ 堆、方法区 / 程序计数器、虚拟机栈、本地方法栈
- `[D4-06]` 对象创建的 5 步：类加载检查 → \_\_ → \_\_ → 设置对象头 → \_\_方法。→ 分配内存 / 零值初始化 / init
- `[D4-07]` Eden 区满了触发 \_\_GC（毫秒级），老年代满了触发 \_\_GC（秒级甚至更长，会导致 STW）。→ Minor / Full

#### 简答题

- `[D4-08]` 对象从创建到被 GC 回收的完整过程？
  > new 对象 → 分配在 Eden → Eden 满 Minor GC → 存活的移到 S0（年龄 1）→ 反复在 S0/S1 倒腾 → 年龄达 15（或动态年龄判定）→ 晋升老年代 → GC Roots 不可达 → 回收
- `[D4-09]` 什么是 GC Roots？列举常见的 GC Roots。
  > GC Roots 是可达性分析的起点。JVM 从它们出发，能到达的对象是存活的。常见 Roots：栈帧中的局部变量引用、静态变量引用、常量引用、活跃线程。
- `[D4-10]` Full GC 频繁怎么排查？
  > 看监控老年代占用趋势 → 加 -XX:+HeapDumpOnOutOfMemoryError → OOM 时拿 hprof 文件 → 用 MAT 分析最大对象 → 顺着线程栈定位代码 → 常见原因：SQL 没分页、定时任务频率太高、内存泄漏

---

### Day 5 — 线程池与锁

#### 选择题

- `[D5-01]` 以下哪个线程池快捷方法使用了无界队列，可能导致 OOM？ → D（newFixedThreadPool 和 newSingleThreadExecutor）
- `[D5-02]` CallerRunsPolicy 拒绝策略的行为是？
  A. 抛异常 / B. 丢弃任务 / C. 由提交任务的线程自己执行 / D. 丢弃最老的任务 → C
- `[D5-03]` synchronized 在 JDK6 之后引入了什么优化，使其性能大幅提升？
  A. 自旋锁 / B. 锁升级（偏向锁→轻量级锁→重量级锁）/ C. 读写锁 / D. 公平锁 → B
- `[D5-04]` CPU 密集型任务的核心线程数一般设为？
  A. CPU 核心数 × 2 / B. CPU 核心数 + 1 / C. CPU 核心数 / D. 32 → B

#### 填空题

- `[D5-05]` 线程池执行顺序：核心线程 → \_\_ → 扩到最大线程数 → \_\_策略。→ 任务队列 / 拒绝
- `[D5-06]` 排查死锁的命令：先用 \_\_查看 Java 进程 ID，再用 \_\_打印线程栈信息。→ jps / jstack
- `[D5-07]` IO 密集型任务核心线程数建议设为 CPU 核心数的 \_\_倍（或更多），因为线程大部分时间在"等"而不是"算"。→ 2

#### 简答题

- `[D5-08]` 线程池七大参数分别是什么？生产环境为什么不用 Executors？
  > corePoolSize、maximumPoolSize、keepAliveTime、unit、workQueue、threadFactory、handler。Executors 的快捷方法要么用无界队列（可能 OOM），要么最大线程数 Integer.MAX_VALUE（线程爆炸），生产环境不安全。
- `[D5-09]` synchronized 和 ReentrantLock 的区别？怎么选？
  > synchronized 自动释放锁、JDK6+有锁升级性能好，95%场景够用；ReentrantLock 支持 tryLock 超时、可中断、公平锁、多 Condition，5%高级场景使用。项目里多产线叫料并发用了 ReentrantLock。
- `[D5-10]` 死锁产生的必要条件？怎么排查？
  > 四个条件：互斥、持有并等待、不可抢占、循环等待。排查：jps 找进程 → jstack 打印线程栈 → 看是否有 "Found one Java-level deadlock"。预防：固定加锁顺序、设置超时（tryLock）。

---

### Day 6 — 并发工具与原理

#### 选择题

- `[D6-01]` CAS 的底层实现依赖什么？ → C（CPU 的 cmpxchg 指令）
- `[D6-02]` AQS 中 state 的含义由谁定义？
  A. AQS 框架固定 / B. 子类自定义 / C. 操作系统 / D. JVM → B
- `[D6-03]` CAS 的 ABA 问题怎么解决？
  A. 加 synchronized / B. 用 AtomicStampedReference 加版本号 / C. 增加自旋次数 / D. 用 volatile → B
- `[D6-04]` CountDownLatch 和 Semaphore 的区别？
  A. CountDownLatch 让 N 个线程等一个信号，Semaphore 限制同时执行的线程数
  B. 没区别
  C. CountDownLatch 可重入，Semaphore 不可重入
  D. Semaphore 让 N 个线程等一个信号 → A

#### 填空题

- `[D6-05]` AQS 的核心公式：AQS = \_\_ + \_\_队列。→ CAS / CLH
- `[D6-06]` CAS 的全称是 Compare And \_\_，Java 中 AtomicInteger 的 incrementAndGet 底层就是 \_\_。→ Swap / CAS 自旋
- `[D6-07]` CountDownLatch 的 state 代表还需等待的 \_\_数，Semaphore 的 state 代表剩余的 \_\_数。→ 线程 / 许可证

#### 简答题

- `[D6-08]` AQS 的核心思想是什么？ReentrantLock、CountDownLatch、Semaphore 分别怎么用 AQS？
  > AQS = CAS（修改 state）+ CLH 队列（排队）。ReentrantLock：state 0→1 表示加锁，>1 表示重入；CountDownLatch：state > 0 就等，= 0 放行；Semaphore：state > 0 就减 1 放行，= 0 排队。
- `[D6-09]` CAS 的两个问题及解决方案？
  > ABA 问题：值被别人改过又改回来，用 AtomicStampedReference 加版本号。自旋开销：高并发下频繁失败 CPU 空转，失败到一定次数退化成 synchronized（ConcurrentHashMap 的策略）。
- `[D6-10]` volatile 能保证原子性吗？为什么 count++ 不安全？
  > 不能。volatile 只保证可见性，不保证原子性。count++ 是读-改-写三步操作，不是原子的。两个线程可能同时读到同一个值，各加 1，结果只加了 1。要用 AtomicInteger（CAS）或加锁。

---

### Day 7 — MySQL 索引

#### 选择题

- `[D7-01]` MySQL 为什么选 B+ 树而不是红黑树做索引？ → B（树矮 I/O 少 + 叶子链表支持范围查询）
- `[D7-02]` 聚簇索引的叶子节点存的是什么？
  A. 主键 ID / B. 整行数据 / C. 物理地址 ROWID / D. 索引列值 + 主键 → B
- `[D7-03]` 以下哪种情况会触发回表？
  A. 通过主键查整行 / B. 通过普通索引查 SELECT * / C. 查询字段全部在索引中 / D. 通过主键查部分字段 → B
- `[D7-04]` 联合索引 (a, b, c)，以下哪个查询能用到这个索引？
  A. WHERE c = 1 / B. WHERE b = 1 AND c = 1 / C. WHERE a = 1 AND c = 1 / D. WHERE a = 1 AND b = 1 → D

#### 填空题

- `[D7-05]` B+ 树两层核心特征：只有 \_\_节点存数据，内部节点只存 key；叶子节点之间是 \_\_链表，适合范围查询。→ 叶子 / 双向
- `[D7-06]` B+ 树 3 层能存约 \_\_万条数据（假设一行 1KB，页 16KB），每次查询最多 \_\_次磁盘 I/O。→ 2000 / 3
- `[D7-07]` 最左前缀原则：联合索引 (a, b, c)，查询条件必须从 \_\_列开始，跳过左边列则索引 \_\_。→ 最左 / 失效（无法充分利用）
- `[D7-08]` 索引失效常见场景：函数运算、\_\_类型转换、\_\_模糊匹配、违反最左前缀。→ 隐式 / 前导%（%开头）

#### 简答题

- `[D7-09]` 什么是回表？什么是覆盖索引？覆盖索引怎么避免回表？
  > 普通索引叶子节点只存主键 ID，查到 ID 后再去聚簇索引查整行数据叫回表。覆盖索引是查询字段全部包含在索引的叶子节点中，不需要回表。例如联合索引 (age, name)，查询 SELECT age, name FROM ... WHERE age = 25 就可以直接从索引返回。
- `[D7-10]` 为什么推荐用自增 ID 做主键，不推荐 UUID？
  > 自增 ID 的 key 递增，新数据追加到 B+ 树最右边，不发生页分裂，性能好。UUID 是随机的，插入位置不固定，频繁导致页分裂，性能差。分布式场景可用雪花算法替代。
- `[D7-11]` EXPLAIN 的 type 字段常见值有哪些？哪个最差？
  > system > const > eq_ref > ref > range > index > ALL。ALL 最差，代表全表扫描。

---

### Day 8 — MySQL 事务与优化

#### 选择题

- `[D8-01]` MySQL InnoDB 默认的隔离级别是什么？ → C（可重复读）
- `[D8-02]` 以下哪个操作属于"当前读"？ → B（SELECT ... FOR UPDATE）
- `[D8-03]` next-key lock 等于？
  A. 只有记录锁 / B. 只有间隙锁 / C. 记录锁 + 间隙锁 / D. 表锁 → C
- `[D8-04]` 读已提交（RC）和可重复读（RR）下 ReadView 的区别是？
  A. RC 不用 ReadView / B. RC 每次 SELECT 新建 ReadView，RR 复用第一次 / C. RR 不用 ReadView / D. 没区别 → B

#### 填空题

- `[D8-05]` ACID 四大特性：\_\_性、\_\_性、\_\_性、\_\_性。→ 原子 / 一致 / 隔离 / 持久
- `[D8-06]` 脏读 = 读到别人 \_\_提交的数据；不可重复读 = 同一行前后读到的值 \_\_；幻读 = 同一条件前后结果集 \_\_。→ 还没 / 不同 / 不同
- `[D8-07]` 快照读读的是 MVCC \_\_版本，当前读读的是 \_\_版本并加锁。→ 历史 / 最新
- `[D8-08]` MVCC 的两个核心组件：\_\_log 保存历史版本，\_\_判断哪个版本对当前事务可见。→ undo / ReadView
- `[D8-09]` EXPLAIN 中 type=ALL 代表 \_\_扫描，Extra 中出现 Using \_\_表示需要额外排序。→ 全表 / filesort

#### 简答题

- `[D8-10]` MVCC 在 RC 和 RR 下 ReadView 的生成时机有什么不同？导致什么结果？
  > RC：每条普通 SELECT 都新建 ReadView → 能看到最新已提交数据 → 可能不可重复读。RR：同一事务内复用第一次 ReadView → 多次查询结果一致 → 普通快照读避免不可重复读。
- `[D8-11]` 什么是 next-key lock？它解决什么问题？
  > next-key lock = 记录锁 + 间隙锁。锁住已有记录 + 记录之间的间隙。用于可重复读下当前读范围查询，防止其他事务在范围内插入新数据，从而避免幻读。
- `[D8-12]` 慢 SQL 排查流程是什么？
  > 先通过接口日志/链路追踪确认是 SQL 慢 → 慢查询日志定位具体 SQL → EXPLAIN 看执行计划（type/key/rows/Extra）→ 针对原因优化（索引设计、覆盖索引、SQL 写法、缩小范围）→ 验证效果。不要上来就加索引。
- `[D8-13]` 有索引为什么还可能慢？
  > 命中范围太大、字段选择性差（如 status=已完成占 90%）、时间范围太大、SELECT * 回表多、深分页扫描丢弃大量数据、统计信息不准选错索引、SQL 写法导致索引失效。

---

### Day 9 — Redis 基础

#### 选择题

- `[D9-01]` Redis 的 IO 多路复用在 Linux 下底层用的是哪个系统调用？
  A. select / B. poll / C. epoll / D. read → C
- `[D9-02]` Redis 6+ 引入了多线程，以下哪个操作仍然在主线程单线程执行？
  A. 网络 Socket 数据读写 / B. 大 Key 异步删除 / C. 命令解析和执行 / D. AOF 文件 fsync → C
- `[D9-03]` Redis 混合持久化（RDB+AOF）是什么时候引入的？
  A. Redis 3.0 / B. Redis 4.0 / C. Redis 5.0 / D. Redis 6.0 → B
- `[D9-04]` 纯缓存场景（所有 key 都可以丢），最推荐用哪个内存淘汰策略？
  A. noeviction / B. volatile-lru / C. allkeys-lru / D. volatile-ttl → C
- `[D9-05]` 以下哪个 Redis 数据结构最适合做排行榜？
  A. String / B. Hash / C. Set / D. ZSet → D
- `[D9-06]` AOF 的 everysec 同步策略最多丢失多少数据？
  A. 不丢失 / B. 最多 1 条命令 / C. 最多 1 秒 / D. 最多 5 秒 → C

#### 填空题

- `[D9-07]` Redis 快的三个核心原因：\_\_操作（纳秒级）、IO\_\_复用（一个线程监听万连接）、单线程\_\_设计（避免锁竞争）。→ 纯内存 / 多路 / 无锁
- `[D9-08]` Redis 过期删除策略是\_\_删除（访问时检查）+\_\_删除（后台定时抽查）。→ 惰性 / 定期
- `[D9-09]` Redis 定期删除每秒执行 \_\_次，每次随机抽查 \_\_个 key，过期比例超过 \_\_% 就继续抽查。→ 10 / 20 / 25
- `[D9-10]` Redis 内存淘汰中 LRU 是淘汰最近\_\_使用的 key，LFU 是淘汰最不\_\_使用的 key。→ 最少（最近）/ 经常（频繁）
- `[D9-11]` Redis 单线程指的是\_\_命令处理在一个主线程中串行执行，但 Redis 6+ 的网络\_\_可以多线程。→ 核心数据 / I/O 读写
- `[D9-12]` Hash 存对象比 String 存整个 JSON 更灵活，因为可以\_\_更新单个字段，不需要序列化整个对象。→ 单独（HSET 单个 field）

#### 简答题

- `[D9-13]` Redis 为什么用单线程处理核心命令？单线程有什么优势？
  > 无锁竞争、没有死锁、没有上下文切换开销、单个命令天然原子。CPU 不是瓶颈，内存带宽和网络才是。单线程反而比多线程更简单高效。
- `[D9-14]` RDB 和 AOF 的区别？生产推荐什么？
  > RDB 是定期快照，文件小恢复快但可能丢数分钟数据。AOF 记录写命令，数据安全（everysec 最多丢 1 秒）但文件大恢复慢。生产推荐 RDB+AOF 混合持久化（Redis 4.0+），AOF 文件前半部分是 RDB 快照，后半部分是增量 AOF 命令。
- `[D9-15]` Redis 过期删除的"惰性 + 定期"组合策略是怎么工作的？
  > 惰性删除：访问 key 时检查是否过期，过期就删。定期删除：后台每秒执行 10 次，每次随机抽查 20 个有过期时间的 key，删掉过期的，过期比例超过 25% 继续抽查。两者配合：大部分被定期抽查删掉，漏掉的下次访问时惰性删除。
- `[D9-16]` LRU 和 LFU 有什么区别？什么时候选 LFU？
  > LRU 淘汰最近最少使用的（看最近有没有被访问）。LFU 淘汰最不经常使用的（看访问频率）。如果一个 key 历史上被访问了很多次但最近没被访问，LRU 可能淘汰它，但 LFU 会保留。有明显冷热数据分化的场景选 allkeys-lfu 更好。
- `[D9-17]` Redis 五大数据结构分别适合什么场景？
  > String：缓存、计数器、分布式锁。Hash：存对象、购物车。List：消息队列、最新列表。Set：点赞、标签、共同关注、去重。ZSet：排行榜、延迟队列。
- `[D9-18]` 为什么 Redis 的 LRU 是"近似 LRU"而不是精确 LRU？
  > 精确 LRU 需要维护全局链表，每次访问都要更新，开销大。Redis 用采样淘汰，每次随机抽查 5 个 key 淘汰最久没访问的，O(1) 复杂度，命中率已经足够接近精确 LRU。

---

### Day 10 — 缓存与分布式锁（待补充）

> 今日复习完成后补充题目。

---

### Day 11 — Spring 与 Spring Boot

#### 选择题

- `[D11-01]` @SpringBootApplication 等价于以下哪三个注解的组合？
  A. @Configuration + @ComponentScan + @EnableAutoConfiguration / B. @SpringBootConfiguration + @ComponentScan + @EnableAutoConfiguration / C. @BootConfiguration + @BeanScan + @Autowired / D. @SpringBootConfiguration + @EnableWebMvc + @ComponentScan → B
- `[D11-02]` Spring Boot 自动配置的候选类列表存放在哪里？
  A. application.yml / B. META-INF/spring.factories（或 AutoConfiguration.imports）/ C. pom.xml / D. @SpringBootApplication 注解属性 → B
- `[D11-03]` 以下哪个注解的作用是"容器里没有这个 Bean 才自动创建，用户自定义优先"？
  A. @ConditionalOnClass / B. @ConditionalOnProperty / C. @ConditionalOnMissingBean / D. @ConditionalOnWebApplication → C
- `[D11-04]` @Transactional 默认对哪种异常回滚？
  A. 所有 Exception / B. 所有 Throwable / C. RuntimeException 和 Error / D. IOException 和 Exception → C
- `[D11-05]` 同一个 Service 类中，方法 A 调用方法 B，B 上有 @Transactional，B 的事务是否生效？
  A. 生效 / B. 不生效，因为是 this 调用绕过代理 / C. 取决于 A 是否有事务 / D. 取决于传播级别 → B

#### 填空题

- `[D11-06]` @EnableAutoConfiguration 通过 @Import(\_\_\_\_\_) 去读取 spring.factories 中的候选自动配置类。→ AutoConfigurationImportSelector
- `[D11-07]` 自动配置的三个核心条件判断：@ConditionalOn\_\_（classpath 有类吗）、@ConditionalOn\_\_（配置属性匹配吗）、@ConditionalOn\_\_\_\_（容器里还没人创建吧）。→ Class / Property / MissingBean
- `[D11-08]` Spring Boot 启动时读取 spring.factories 拿到 130+ 个候选自动配置类，经过 @Conditional 过滤后通常只有 \_\_～\_\_ 个真正生效。→ 30 / 40
- `[D11-09]` @Transactional 底层通过 AOP 动态代理，事务拦截器叫 \_\_\_\_\_\_\_\_，方法前开启事务，正常结束 commit，异常 rollback。→ TransactionInterceptor
- `[D11-10]` 传播级别（propagation）控制的是当前方法和已有\_\_的关系；隔离级别（isolation）控制的是事务之间\_\_读写的程度。→ 事务 / 互相

#### 简答题

- `[D11-11]` Spring Boot 自动配置的完整链路是什么？
  > 启动类 @SpringBootApplication → @EnableAutoConfiguration → @Import(AutoConfigurationImportSelector) → 读取 spring.factories 获取候选自动配置类（130+）→ 逐个检查 @Conditional 条件 → 满足的注册 Bean，不满足的跳过 → @ConditionalOnMissingBean 保证用户自定义 Bean 优先
- `[D11-12]` 自动配置负责创建的 Bean 和 @ComponentScan 扫描的 Bean 有什么区别？
  > 自动配置负责基础设施 Bean（DataSource、DispatcherServlet、TransactionManager 等），来自框架 starter 的自动配置类。@ComponentScan 负责业务 Bean（Service、Controller、Repository），来自你自己写的代码。@MapperScan 负责 Mapper 接口。三者职责不同。
- `[D11-13]` @Transactional 哪些情况下会失效？至少说 4 个。
  > ① 自调用：this.methodB() 绕过代理对象；② 非 public 方法：AOP 只能拦截 public；③ 异常被 catch 吞掉：代理以为正常结束走了 commit；④ 异常类型不匹配：默认只回滚 RuntimeException，检查异常不回滚；⑤ 类没交给 Spring 管理：自己 new 的对象没有代理；⑥ 传播级别 NOT_SUPPORTED：明确不要事务
- `[D11-14]` @SpringBootApplication(exclude = FreeMarkerAutoConfiguration.class) 这行代码的作用是什么？为什么要排除？
  > 排除 FreeMarker 自动配置类，不让它生效。原因通常是项目不需要 FreeMarker 模板视图（如前后端分离项目），或者自动配置和项目已有配置冲突。
- `[D11-15]` starter 是什么？它和自动配置是什么关系？
  > starter 不是功能代码本身，而是"依赖集合 + 自动配置类的入口"。引入 starter 后，里面的自动配置类被 spring.factories 列出，启动时作为候选被加载。项目通过引 starter + 写 application.yml 配置就能获得对应能力，不需要手写 @Bean。

---

### Day 12 — 分布式 MQ 与系统设计

#### 选择题

- `[D12-01]` RocketMQ 同步发送中，生产端判断 Broker 已确认接收消息，主要看什么？
  A. 消费者是否已经消费 / B. `SendResult` 且状态为 `SEND_OK` / C. offset 是否提交 / D. 死信队列是否为空 → B
- `[D12-02]` RocketMQ 中 `SYNC_FLUSH` 主要解决哪类风险？
  A. 消费者重复消费 / B. Master 写入 PageCache 后未刷盘就宕机 / C. 生产者重复发送 / D. 消息全局顺序 → B
- `[D12-03]` RocketMQ 中 `SYNC_MASTER` 主要表示什么？
  A. Master 本机同步刷盘 / B. Consumer 同步提交 offset / C. Slave 同步完成后再返回发送成功 / D. 所有 Topic 全局有序 → C
- `[D12-04]` 消费端避免“看起来丢消息”的正确做法是？
  A. 收到消息立刻返回 `CONSUME_SUCCESS` / B. 业务处理成功后再返回 `CONSUME_SUCCESS` / C. 关闭重试机制 / D. 所有消息都用单向发送 → B
- `[D12-05]` RocketMQ 事务消息的 Half Message 在 commit 前对消费者是什么状态？
  A. 可见并可消费 / B. 只对部分消费者可见 / C. 不可见 / D. 已进入死信队列 → C
- `[D12-06]` AGV/RCS 中同一个任务的创建、派发、完成事件要保证顺序，最合适的做法是？
  A. 所有消息全局单队列 / B. 随机选择队列 / C. 按 `taskId` 选择同一个 MessageQueue / D. 只提高消费者线程数 → C

#### 填空题

- `[D12-07]` RocketMQ 异步发送也有确认机制，成功和失败分别通过 `SendCallback` 的 ______ 和 ______ 处理。→ onSuccess / onException
- `[D12-08]` `SYNC_FLUSH` 保证 ______ 本机落盘；`SYNC_MASTER` 保证 ______ 也同步完成。→ Master / Slave
- `[D12-09]` 本地消息表也叫 Outbox，主要解决可靠发送和 ______；消费端 Inbox 主要解决 ______。→ 补偿 / 重复消费或幂等
- `[D12-10]` RocketMQ 事务消息回查由 ______ 发起，回查逻辑由 ______ 实现。→ Broker / Producer
- `[D12-11]` 限流、熔断、降级的记忆口径：限流防 ______，熔断防 ______，降级保 ______。→ 冲垮 / 拖垮 / 核心
- `[D12-12]` AGV/RCS 中，`taskId` 通常是系统内部 ______ ID，`externalTaskId` / `wmsTaskNo` 通常是业务 ______ ID。→ 分布式唯一 / 幂等

#### 简答题

- `[D12-13]` MQ 怎么保证消息不丢失？请按生产端、Broker 端、消费端三段回答。
  > 生产端要有发送确认，RocketMQ 同步发送看 SendResult/SEND_OK，异步发送处理 onSuccess/onException，失败或未知结果重试或写本地消息表。Broker 端用 SYNC_FLUSH 保证 Master 落盘，用 SYNC_MASTER 保证 Slave 同步。消费端必须业务成功后再返回 CONSUME_SUCCESS，失败重试，多次失败进死信队列，并用补偿任务和幂等兜底。
- `[D12-14]` 本地消息表和 RocketMQ 事务消息分别解决什么问题？二者有什么区别？
  > 本地消息表是业务侧 Outbox 策略，把业务数据和待发送消息放在同一个本地事务里，失败后靠定时任务补发。RocketMQ 事务消息是 MQ 原生能力，先发 Half Message，执行本地事务后 commit/rollback，未知时 Broker 回查 Producer。二者都解决生产端本地事务和发消息一致性，但实现位置不同；都不能替代消费端幂等。
- `[D12-15]` 设计一个 AGV/RCS 任务调度系统时，如何处理任务幂等、并发抢占和执行中异常？
  > 任务创建用 externalTaskId/wmsTaskNo 加唯一索引防重，内部用 taskId 做分布式唯一 ID。多实例调度时用状态机 + update where 抢占任务和车辆，根据影响行数判断是否成功。MQ 事件按 taskId 分队列保证同一任务顺序。DISPATCHING 中间态超时补偿，EXECUTING 阶段结合车辆心跳、位置上报、任务进度和告警处理，不能简单回滚。

---

### Day 12.5 — AI Specs & Harness 专项（宁波震裕面试重点）

#### 选择题

- `[D12.5-01]` AI Spec 和普通需求文档的核心区别是什么？
  A. AI Spec 更详细 / B. AI 输出不确定，需要额外定义质量标准/评估方式/降级策略 / C. AI Spec 只有技术人员需要看 / D. 没有本质区别 → B
- `[D12.5-02]` AI Spec 的三层结构中，"响应时间 ≤ 3s，超时返回原文"属于哪一层？
  A. 功能规格 / B. Prompt 规格 / C. 评估规格 / D. 接口规格 → A
- `[D12.5-03]` 以下哪个选项属于 Prompt 规格的定义？
  A. 命中率 ≥ 88% / B. 响应时间 ≤ 3s / C. "不确定时回答'根据现有资料无法确定'" / D. 服务可用性 ≥ 99.9% → C
- `[D12.5-04]` 检索场景中，衡量"正确答案在不在返回的 Top-K 里"的指标是？
  A. 准确率 / B. 精确率 / C. Recall@K / D. F1 Score → C
- `[D12.5-05]` Harness 的核心组件不包括以下哪个？
  A. 验证数据集 / B. 评测流水线 / C. 模型训练 / D. 回归测试 → C
- `[D12.5-06]` 判断 AI 输出对错时，问答场景用什么方法？
  A. 只看关键词命中 / B. 关键词命中 + 语义相似度 / C. 只看人工审核 / D. LLM-as-Judge 自动判 → B

#### 填空题

- `[D12.5-07]` Spec 和 Harness 的关系：Spec 是 ______，Harness 是 ______。→ 菜谱（定义标准）/ 验菜员（验证达标）
- `[D12.5-08]` 判断 AI 输出对错时，问答场景用 ______ + ______；检索场景用 ______；兜底方案每周 ______ 条人工审核。→ 关键词命中 / 语义相似度（embedding 余弦相似度）/ Recall@K / 50
- `[D12.5-09]` 你的项目命中率 baseline ______% → 目标 ______%，测试集 ______ 条真实问题。→ 65 / 88 / 200
- `[D12.5-10]` LLM-as-Judge 是用大模型评估大模型输出，优点是 ______，缺点是 ______。→ 成本低可自动化 / 判断不完全可靠
- `[D12.5-11]` Spec 三层结构：① ______ 规格（边界/输入输出/降级）② ______ 规格（角色/约束/格式）③ ______ 规格（指标/阈值）。→ 功能 / Prompt / 评估
- `[D12.5-12]` 你的 Harness 验证集分层：开发自测 ______ 条，回归测试 ______+ 条，对抗测试 ______+ 条。→ 20-50 / 500 / 50

#### 简答题（必须能流利回答）

**D12.5-01** AI Spec 和普通需求文档有什么区别？为什么 AI 需要额外的 Spec？

你的答案要点：( )

> **参考答案**：AI 输出不确定，需要额外定义质量标准（准确率/召回率）、评估方式、降级策略。普通功能输入 A 输出 B 是确定的，但 AI 同一个问题可能给出不同回答，有些对有些错。

---

**D12.5-02** 你项目里的命中率 88% 是怎么定的？baseline 是多少？

你的答案要点：( )

> **参考答案**：先跑 baseline 65% → 业务底线 80% → 争取目标 88%，数据驱动不是拍脑袋。准备 200 条测试集人工标注，看模型原始表现，再结合业务可接受范围定目标。

---

**D12.5-03** Prompt 怎么管理版本？改了 Prompt 怎么确保不回退？

你的答案要点：( )

> **参考答案**：Nacos 配置中心管理 → 开发环境单元测试 → 测试环境集成测试（200条）→ 回归测试（500+条）→ 指标不下降才发布。Prompt 变更纳入发版流程，和改代码一个逻辑。

---

**D12.5-04** Harness 的核心组件有哪些？你的验证集规模是多少？

你的答案要点：( )

> **参考答案**：验证数据集（问答200+/检索100条/比对50组）+ 评测流水线 + CI/CD集成（Jenkins）+ 监控告警。每次发版前自动跑，生成报告，指标不达标阻断发布。

---

**D12.5-05** 怎么判断 AI 输出是对还是错？不同场景怎么区分？

你的答案要点：( )

> **参考答案**：问答用关键词命中+语义相似度（embedding余弦相似度，阈值0.85）；文档比对直接对比差异条数；检索看标注文档在不在Top-K；兜底人工抽样每周50条。

---

**D12.5-06** 什么是 LLM-as-Judge？你们怎么用的？

你的答案要点：( )

> **参考答案**：用大模型评估大模型输出。优点成本低可自动化，能评估语义相似性；缺点判断不完全可靠。作为初筛用过滤明显错误，关键case仍人工审，用100条数据做校准对齐人工标准。

---

### Day 16 — 面试实战经典题（第十六章）

> 2026-07-06 新增，对应八股文题单第十六章 8 道经典题

#### 选择题

- `[D16-01]` MySQL UPDATE 执行时，哪个日志是"物理日志"记录"哪个数据页改了什么"？
  A. binlog / B. redo log / C. undo log / D. slow log → B
- `[D16-02]` BIO、NIO、AIO 中，NIO 的核心机制是什么？
  A. 一连接一线程 / B. Selector 多路复用，一个线程管理多个连接 / C. OS 完成后回调 / D. 内核态线程直接处理 → B
- `[D16-03]` Java 反射 `Method.invoke()` 的性能优化机制叫什么？
  A. JIT编译 / B. Inflation机制（前15次native，之后ASM生成字节码）/ C. 内联缓存 / D. 方法句柄 → B
- `[D16-04]` JDK 21 虚拟线程的调度方式是什么？
  A. 1:1 映射 OS 线程 / B. N:1 映射 / C. M:N 映射，IO阻塞时自动卸载 / D. 完全由OS调度 → C

#### 填空题

- `[D16-05]` MySQL UPDATE 中，redo log 先写 ______ 状态，binlog 写完后再改为 ______ 状态，这就是两阶段提交。→ prepare / commit
- `[D16-06]` BIO 是 ______ 阻塞，NIO 是 ______ 非阻塞 + IO 多路复用，AIO 是异步非阻塞。→ 同步 / 同步
- `[D16-07]` DDD 战略设计的核心是划分 ______，战术设计核心包括实体、值对象、______、领域服务、仓储。→ 限界上下文 / 聚合
- `[D16-08]` AI Coding 适用业务的判断三要素：需求 ______、有 ______ 手段、上下文可控。→ 明确 / 验证

#### 简答题

- `[D16-09]` 一条 UPDATE 在 MySQL 中的完整执行流程？（server层、引擎层、三本日志、两阶段提交）
  > 连接器→分析器→优化器→执行器→引擎层：定位行→加锁→写undo→改Buffer Pool→写redo(prepare)→写binlog→redo(commit)。两阶段提交保证redo和binlog一致，崩溃恢复不丢数据。
- `[D16-10]` BIO/NIO/AIO 区别？为什么 NIO 能"一个线程管万连接"？AIO 在 Linux 为什么用得少？
  > BIO同步阻塞一连接一线程；NIO同步非阻塞+Selector多路复用，epoll监听就绪事件，一线程管万连接；AIO异步非阻塞但Linux不成熟，Java AIO底层仍用epoll模拟，所以主流用NIO（Netty）。
- `[D16-11]` Java 反射原理？`Method.invoke()` 底层实现？如何优化？
  > 入口是Class对象（元空间元数据）。Method.invoke先走NativeMethodAccessorImpl（前15次），第16次起JVM用ASM动态生成字节码直接调用（inflation机制）。优化：缓存Method对象、setAccessible(true)跳安全检查。
- `[D16-12]` 虚拟线程核心机制？使用注意事项（至少3个）？
  > M:N调度，虚拟线程跑在少量载体线程上，IO阻塞时自动卸载让载体干别的。注意事项：①不池化（用完即弃）②少用synchronized（会pin住载体）③慎用ThreadLocal（百万虚拟线程=内存爆炸）④CPU密集任务无提升。
- `[D16-13]` Claude Code vs Codex 各自优势？你怎么选？
  > CC强在长链路Agent+工程化生态（MCP/Skills/Hooks）；Codex强在GitHub集成+OpenAI模型。复杂任务给CC，短平快PR相关给Codex。关键是围绕工具建立AI工程工作流。
- `[D16-14]` Skill 是什么？什么时候该写 Skill？
  > Skill是把重复工作流封装成Agent能力包（SKILL.md+scripts），按需加载省token。和代码抽函数同理，出现两次以上的流程就值得沉淀成Skill。
- `[D16-15]` AI Coding 适用什么业务？判断标准是什么？
  > 适合：CRUD、重构、写测试、文档脚本、有明确规范的功能。不适合：核心业务逻辑、架构选型、安全、高性能调优。判断三要素：需求明确+有验证手段+上下文可控。
- `[D16-16]` DDD 是什么？战略设计和战术设计分别指什么？什么时候该用？
  > DDD是让软件结构反映业务领域复杂性的方法论。战略设计=限界上下文划分（解决系统边界）；战术设计=实体/值对象/聚合/领域服务/仓储（解决代码怎么写）。适合业务复杂+团队大+长期演进；简单CRUD别强行用。

---

### Day 17 — 面试实战新题收集（2026-07-07）

> 实际面试中遇到的新题 & 高频 AI/Agent 专项题，持续补充

#### 选择题

- `[D17-01]` JDK 8 引入的以下哪个特性可以让接口中编写带有方法体的方法？
  A. Lambda 表达式 / B. 默认方法（default method）/ C. Stream API / D. Optional 类 → B
- `[D17-02]` ArrayList 在迭代过程中调用 `list.add()` 会触发什么？
  A. 正常追加 / B. 覆盖当前元素 / C. 抛 ConcurrentModificationException / D. 死循环 → C
- `[D17-03]` 以下哪个不属于 JDK 8 的新特性？
  A. Lambda 表达式 / B. Stream API / C. 虚拟线程 / D. 元空间（Metaspace）→ C
- `[D17-04]` 在 RAG 系统中，Chunk 之间设置重叠（Overlap）的主要目的是什么？
  A. 减少向量库存储量 / B. 避免分块断裂导致上下文丢失 / C. 提升检索速度 / D. 降低 Embedding 调用次数 → B
- `[D17-05]` MCP（Model Context Protocol）主要解决什么问题？
  A. 让模型输出更准确 / B. 工具的标准化发现、描述、调用和返回 / C. 降低 API 调用成本 / D. 管理 Prompt 版本 → B
- `[D17-06]` Agent 中"防死循环三件套"不包括以下哪项？
  A. 最大步数限制 / B. 重复动作检测 / C. 温度参数调低 / D. 超时控制 → C
- `[D17-07]` Context Engineering 和 Prompt Engineering 的核心区别是什么？
  A. 没区别，同一个概念 / B. Prompt Engineering 关注指令，Context Engineering 关注什么信息在什么时机进模型窗口 / C. Context Engineering 是 Prompt Engineering 的子集 / D. Context Engineering 只处理多轮对话 → B

#### 填空题

- `[D17-08]` ArrayList 的 fail-fast 机制通过一个叫 \_\_\_\_ 的字段实现：每次结构性修改 +1，迭代器创建时快照这个值，每次 next() 时检查是否被修改过。→ modCount
- `[D17-09]` JDK 8 的 Stream 操作分为 \_\_\_\_ 操作（如 filter/map）和 \_\_\_\_ 操作（如 collect/forEach），中间操作是惰性的。→ 中间 / 终端
- `[D17-10]` JDK 8 的 \_\_\_\_ 类用来优雅地避免 NullPointerException，常用方法有 orElse/orElseGet/orElseThrow。→ Optional
- `[D17-11]` RAG 的检索评估指标中 Recall@K 表示 \_\_\_\_，Precision@K 表示 \_\_\_\_。→ 正确答案在前 K 个中的比例 / 前 K 个结果中相关文档的比例
- `[D17-12]` Agent 架构中 MCP 解决 Agent 到 \_\_\_\_ 的通信标准，A2A 协议解决 Agent 到 \_\_\_\_ 的通信标准。→ 工具 / Agent
- `[D17-13]` Context Engineering 要解决上下文污染，三种手段是 \_\_\_\_、\_\_\_\_ 和 \_\_\_\_。→ Sub-agent 分离 / 结构化笔记压缩 / 上下文滑动窗口

#### 简答题

- `[D17-14]` JDK 8 的主要新特性有哪些？挑 3-4 个展开讲。
  > JDK8 最重要的新特性：① Lambda 表达式——把函数当参数传，配合函数式接口 @FunctionalInterface，让代码从"怎么做"变成"做什么"；② Stream API——filter/map/reduce 链式操作集合，惰性求值 + 流水线，代码简洁且易并行；③ Optional 类——orElse/orElseThrow 优雅防 NPE，比 if-null 检查更安全；④ 新日期 API——LocalDate/LocalDateTime/Instant 不可变线程安全，替代老的 Date/Calendar。另外还有接口默认方法、元空间取代永久代等。
- `[D17-15]` ArrayList 的 fail-fast 机制是什么？底层怎么实现的？怎么避免？
  > fail-fast 是 ArrayList 在遍历过程中检测到结构性修改（add/remove/clear）时立即抛 ConcurrentModificationException 的机制。底层通过 modCount 字段实现：每次 add/remove modCount+1，创建迭代器时记录 expectedModCount=modCount，每次 next()/remove() 时检查两者是否相等，不等就抛异常。单线程解决用 iterator.remove()（它会同步 modCount），多线程用 CopyOnWriteArrayList（写时复制，读不加锁）。
- `[D17-16]` 什么是 Agent Harness？它和普通的 while(true) 循环有什么区别？
  > Agent Harness 是 Agent 的执行骨架/运行时系统，包含循环控制、工具注册与调度、上下文管理、状态维护、错误处理、超时控制、并发管理。和普通 while(true) 的区别：生产级 Harness 需支持可配置的循环策略（最大步数、单步超时、Token 预算）、优雅终止（接近上限时提示"请尽快收尾"而非强杀）、状态快照与恢复（长任务中断可恢复）。一句话：Agent = Model + Harness，模型负责推理，Harness 负责把任务、上下文、工具和反馈组织成可控的运行时。
- `[D17-17]` MCP 协议的三层架构是什么？MCP 和 Function Calling 有什么区别？
  > MCP（Model Context Protocol）三层架构：Host（Agent 宿主，如 Claude Code）、Client（协议客户端，连接 Server）、Server（暴露工具如文件/数据库/API）。和 Function Calling 的区别：FC 是模型如何输出结构化的工具调用意图（表达层），MCP 是工具如何被标准化的发现、描述、调用和返回（协议层），Skills 是 Agent 做某类任务时应按什么流程执行（任务层）。三者不是替代关系，是不同层次的组合。MCP 解决 N×M 集成爆炸问题——不需要为每个工具写自定义集成代码。
- `[D17-18]` RAG 中 Chunk 策略有哪些？怎么判断 Chunk Size 合不合适？
  > 常见 Chunk 策略：① 语义分块——按标题层级/段落切分，不是纯按字符数，用文档结构（Markdown 标题、PDF 章节）做边界；② 固定大小 + 重叠——如 512 tokens + 50 字 overlap，防止边界信息丢失；③ Layout-Aware——识别表格/图片/代码块特殊处理。判断 Chunk Size 是否合适看 Recall@K：块太大 → 噪声多（包含无关内容），块太小 → 上下文不够模型理解。从 256 tokens 开始试，逐步调大到 1024，看检索指标变化。
- `[D17-19]` 什么是 Context Engineering？和 Prompt Engineering 什么关系？
  > Prompt Engineering 关注指令怎么写清楚（System Prompt 的角色/约束/格式）。Context Engineering 关注什么信息在什么时机进入模型窗口（Context Window 的内容管理）。后者比前者更高阶：静态规则放 System Prompt、动态检索结果放 User Message、工具结果单独放 Tool Response、长对话要窗口滑动。上下文污染治理：Sub-agent 分离（探索性任务给子 agent）、结构化笔记压缩、上下文滑动窗口、任务状态持久化。2026 年面试高频题，体现你对 AI 工程化的深度理解。
- `[D17-20]` Agent Loop 的几种模式？ReAct、Plan-and-Execute、Reflection 有什么区别？
  > 三种主要模式：① ReAct——Thought→Action→Observation 三步循环，透明可审计，但 Token 消耗大，可能死循环；② Plan-and-Execute——先一次性生成完整计划再逐步执行，Token 消耗约 ReAct 的 20%，但计划不合理需重新规划；③ Reflection——生成 + 审查双 Agent 循环迭代，质量高但 Token 翻倍。防死循环三件套：最大步数限制（通常 15 步）、重复动作检测（连续 3 次相同则退出）、超时控制。项目里 Java+AI 落地主要用 ReAct 模式，清晰可控。

---

### Day 18 — 汇川面试冲刺补充（2026-07-16）

> 针对汇川技术（供应链采购 Java 岗）冲刺复习中发现的题库缺口补强：ArrayList 扩容、JVM 栈帧、GC 算法、CMS/G1、MySQL 深分页、最左前缀范围中断。均为今晚复习纠正过的高频细节。

#### 选择题

- `[D18-01]` JDK8 中执行 `new ArrayList()` 后，内部数组的状态是？
  A. 立即创建容量 10 的数组 / B. 创建空数组 {}，首次 add 才扩容到 10 / C. 创建容量 16 的数组 / D. 创建默认容量 0 且永不扩容 → B
- `[D18-02]` ArrayList 每次扩容为原来的多少倍？
  A. 2 倍 / B. 1.5 倍 / C. 1.25 倍 / D. 固定 +10 → B
- `[D18-03]` JVM 虚拟机栈的栈帧中，以下哪个**不属于**其组成部分？
  A. 局部变量表 / B. 操作数栈 / C. 程序计数器 / D. 动态链接 → C（程序计数器是独立的线程私有区域，不在栈帧内）
- `[D18-04]` JDK8 的方法区实现是元空间（Metaspace），它使用的是哪种内存？
  A. JVM 堆内存 / B. JVM 虚拟机栈 / C. 本地内存（直接内存）/ D. 程序计数器 → C
- `[D18-05]` 以下哪种 GC 算法**不会**产生内存碎片？
  A. 标记-清除 / B. 复制算法 / C. 标记-清除和复制都会 / D. 三种都会 → B
- `[D18-06]` G1 收集器「Garbage First」的含义是？
  A. 优先回收新生代 / B. 优先回收垃圾最多的 Region（收益最大）/ C. 优先触发 Full GC / D. 优先回收老年代 → B
- `[D18-07]` MySQL 中 `SELECT * FROM t LIMIT 100000, 10` 越往后越慢的根本原因是？
  A. 没有主键 / B. 要先扫描 100010 行再丢弃前 10 万行 / C. limit 语法本身有 bug / D. 索引失效 → B
- `[D18-08]` 联合索引 (a,b,c)，查询 `WHERE a=1 AND b>2 AND c=3` 中 c 能否用到索引？
  A. 能完全用到 / B. 不能，b 是范围查询，c 之后无法用索引（范围之后全失效）/ C. 只有 c 能用 / D. a、b、c 都能用 → B

#### 填空题

- `[D18-09]` ArrayList 扩容公式是 newCapacity = oldCapacity + (oldCapacity \_\_ 1)，即扩为原来的 \_\_ 倍。→ >>（右移）/ 1.5
- `[D18-10]` JVM 虚拟机栈栈帧四部分：局部变量表、\_\_、动态链接、\_\_。递归太深会抛 \_\_Error。→ 操作数栈 / 方法出口 / StackOverflow
- `[D18-11]` JDK8 用 \_\_ 替代了永久代，它使用 \_\_ 内存，可动态扩展，原因是永久代大小固定容易 OOM。→ 元空间（Metaspace）/ 本地（直接）
- `[D18-12]` 四种 GC 算法：标记-清除、\_\_、标记-整理、\_\_。新生代用复制算法是因为 98% 对象朝生夕死、存活少，复制代价 \_\_。→ 复制 / 分代收集 / 小（低）
- `[D18-13]` CMS 四阶段中需要 STW 的是初始标记和 \_\_ 标记；它的三个缺点是内存碎片、\_\_ 垃圾、占 CPU；从 JDK \_\_ 起被废弃。→ 重新 / 浮动 / 9
- `[D18-14]` G1 把堆划分成多个 \_\_（逻辑分代），支持 \_\_ 停顿时间（MaxGCPauseMillis），用整理+复制无碎片，从 JDK \_\_ 起为默认收集器。→ Region / 可预测 / 9
- `[D18-15]` MySQL 深分页优化两种方案：\_\_ 分页（where id > 上次最大 id）、\_\_ 关联（先覆盖索引查 id 再 join 回表）。→ 游标 / 延迟
- `[D18-16]` explain 的 type 从好到差：const > eq_ref > \_\_ > range > index > \_\_，其中 \_\_ 最差代表全表扫描。→ ref / ALL / ALL

#### 简答题

- `[D18-17]` ArrayList 的扩容机制？JDK7 和 JDK8 有什么区别？为什么不建议用 LinkedList？
  > 触发：add 时 size+1 > 数组长度则扩容；公式 newCapacity = oldCapacity + (oldCapacity>>1) 即 1.5 倍，靠 System.arraycopy 搬数据。区别：JDK7 new 出来就是容量 10（饿汉）；JDK8 懒加载，new 出来是空数组 {}，首次 add 才到 10，省内存。能预估大小时 new ArrayList<>(capacity) 指定初始容量避免频繁扩容。实际项目几乎都用 ArrayList：尾部追加 O(1) 均摊、内存连续对 CPU 缓存友好；LinkedList 只在频繁头尾增删才有意义，且中间插入定位要 O(n)。
- `[D18-18]` JVM 运行时数据区怎么划分？虚拟机栈的栈帧包含什么？元空间为什么替代永久代？
  > 线程私有：程序计数器（记录执行位置，唯一不会 OOM）、虚拟机栈、本地方法栈。线程共享：堆（对象和数组，分新生代老年代）、方法区。栈帧四部分：局部变量表（参数和局部变量）、操作数栈（运算中间结果）、动态链接（指向常量池的方法引用）、方法出口（返回地址）。元空间替代永久代是因为永久代大小固定（-XX:MaxPermSize）容易 OOM，元空间用本地内存、可动态扩展，还省 JVM 堆空间。
- `[D18-19]` CMS 和 G1 的区别？各自适用什么场景？
  > CMS：老年代收集器，目标最低停顿，标记-清除算法（有碎片），四阶段中初始标记和重新标记 STW、并发标记和并发清除与用户线程并发。缺点：内存碎片、浮动垃圾、占 CPU，JDK9 起废弃。G1：管整个堆，划分成多个 Region 逻辑分代，名字 Garbage First 指优先回收垃圾最多的 Region，用标记-整理+复制无碎片，支持可预测停顿（MaxGCPauseMillis），JDK9 起默认。大堆（6G+）用 G1，中小堆可用 CMS。
- `[D18-20]` MySQL 深分页为什么慢？怎么优化？explain 的 type 和 Extra 怎么看？
  > 深分页 `LIMIT 100000,10` 慢在要先扫描 100010 行再丢弃前 10 万行。优化：① 游标分页 `where id > 上次最大id order by id limit 10`（主键有序，直接跳过）；② 延迟关联——先走覆盖索引查出 10 个 id，再 join 回表，减少回表次数。explain：type 从好到差 const>eq_ref>ref>range>index>ALL，目标 ref/range 以上，ALL=全表扫描必须优化；Extra 中 Using index=覆盖索引（好）、Using filesort=额外排序（警惕）、Using temporary=临时表（差）。

---

### Day 19 — 并发锁分类与Spring三级缓存（2026-07-16 上午）

> 7/16 上午互动复习补充：线程池执行流程、拒绝策略、锁分类维度、CAS 原子操作、AQS 框架、volatile、死锁预防、Spring AOP 代理、三级缓存循环依赖。均为 D5/D6/D11 未覆盖的面试高频点。

#### 选择题

- `[D19-01]` 线程池任务提交后，扩容触发条件是什么？
  A. 队列中等待任务数超过核心线程数 / B. 等待队列已满 / C. 当前线程数超过最大线程数 / D. 有任务被拒绝 → B
- `[D19-02]` 以下哪种拒绝策略会让提交任务的线程自己执行该任务？
  A. AbortPolicy / B. CallerRunsPolicy / C. DiscardPolicy / D. DiscardOldestPolicy → B
- `[D19-03]` 乐观锁和悲观锁的分类维度是什么？
  A. 排队顺序 / B. 对冲突的态度（是否预期冲突） / C. 锁的粒度 / D. 是否可重入 → B
- `[D19-04]` CAS 是一种什么？
  A. 锁 / B. 思想 / C. 原子操作（CPU 指令保证） / D. 框架 → C
- `[D19-05]` AQS 和 CAS 的关系是什么？
  A. AQS 是 CAS 的升级版 / B. CAS 是 AQS 的底层手段之一，AQS = CAS + CLH 队列 / C. 两者无关 / D. CAS 是 AQS 的子类 → B
- `[D19-06]` volatile 能保证以下哪个？
  A. 原子性 / B. 可见性和禁止指令重排序 / C. 有序性和原子性 / D. 只保证可见性 → B
- `[D19-07]` Spring Boot 2.x 默认使用哪种动态代理？
  A. JDK 动态代理（基于接口） / B. CGLIB（基于继承） / C. 不使用代理 / D. 随机选择 → B
- `[D19-08]` Spring 三级缓存中，二级缓存存的是什么？
  A. 完成品 Bean / B. 提前暴露的半成品 Bean（已实例化未初始化） / C. ObjectFactory 工厂 / D. 代理对象 → B

#### 填空题

- `[D19-09]` 线程池执行流程口诀：\_\_ → \_\_ → \_\_ → \_\_。→ 核心 → 队列 → 最大 → 拒绝
- `[D19-10]` 四种拒绝策略：直接报错(\_\_\_\_\_)、退回提交线程(\_\_\_\_\_\_\_\_\_)、静默丢弃(\_\_\_\_\_\_\_)、丢弃最老(\_\_\_\_\_\_\_\_\_\_\_\_\_)。→ AbortPolicy / CallerRunsPolicy / DiscardPolicy / DiscardOldestPolicy
- `[D19-11]` 锁按态度维度分：\_\_锁（先锁再说）和\_\_锁（冲突了再处理）；按排队维度分：\_\_锁（严格排队）和\_\_锁（可以插队）。→ 悲观 / 乐观 / 公平 / 非公平
- `[D19-12]` volatile 只保证可见性和禁止指令重排序，不保证\_\_性，所以 volatile int count 的 count++ 仍然不安全，要用\_\_或加锁。→ 原子 / AtomicInteger
- `[D19-13]` 死锁四个条件：互斥、持有并等待、\_\_、循环等待。最常破坏的是\_\_条件——统一加锁顺序。→ 不可剥夺 / 循环等待
- `[D19-14]` Spring 三级缓存：一级成品 Bean、二级\_\_ Bean、三级\_\_（给 AOP 用）。普通循环依赖\_\_级就够了，AOP 循环依赖需要\_\_级。→ 半成品 / ObjectFactory / 二 / 三

#### 简答题

- `[D19-15]` 线程池任务提交的完整执行流程是什么？什么条件下触发扩容？什么条件下触发拒绝？
  > 任务提交 → 当前线程数 < corePoolSize 则创建核心线程 → 核心满了放队列 → 队列满了创建非核心线程扩到 maxPoolSize → maxPoolSize 也满了走拒绝策略。扩容触发条件是队列满了（不是队列多了）；拒绝触发条件是最大线程数也满了。空闲超过 keepAliveTime 非核心线程被回收，核心线程不回收。
- `[D19-16]` synchronized 和 ReentrantLock 的区别？什么时候用哪个？
  > synchronized 是 JVM 内置锁（关键字），自动释放，JDK6+有锁升级；ReentrantLock 是 API 显式锁（类），底层 AQS，需手动 lock/unlock（finally），支持公平锁、tryLock 超时、可中断、多 Condition。日常 synchronized 够用就用 synchronized，需要公平锁/超时/中断才上 ReentrantLock。
- `[D19-17]` 乐观锁、悲观锁、公平锁、非公平锁分别是什么？它们是同一个维度的分类吗？
  > 不是同一维度。乐观/悲观是"态度维度"——悲观锁一定冲突先加锁排他（synchronized），乐观锁赌不冲突提交时校验（CAS/version）。公平/非公平是"排队维度"——公平锁按先来后到严格排队，非公平锁允许插队（synchronized 只能非公平，ReentrantLock 可选）。
- `[D19-18]` Spring 三级缓存分别存什么？为什么需要三级？二级不够吗？
  > 一级存成品 Bean，二级存提前暴露的半成品 Bean（已实例化未初始化），三级存 ObjectFactory 工厂。普通循环依赖二级就够了——A 实例化后放半成品到二级，B 创建时从二级拿到 A 引用。三级是为了 AOP——如果 A 需要代理，提前暴露的应该是代理对象，三级缓存的工厂调用时才决定返回原始对象还是代理，保证拿到同一个代理实例。
- `[D19-19]` Spring 事务失效的场景有哪些？
  > ① 同类自调用（this 绕过代理，B 加 @Transactional 被同类 A 调用则失效）；② 非 public 方法（AOP 只拦截 public）；③ 异常被 try-catch 吞掉（Spring 以为正常走了 commit）；④ 异常类型不对（默认只回滚 RuntimeException，checked exception 不回滚，需配 rollbackFor）；⑤ 数据库引擎不支持（MyISAM 不支持事务，需 InnoDB）。

### Day 20 — 汇川面试冲刺全量84题（2026-07-16 下午）

> 汇川技术 Java 一面完整面经 84 道题全覆盖。从基础认知到项目深挖，面试前用"按Day练习"模式刷一遍，重点看 ❌ 的题。

#### 选择题

- `[D20-01]` 以下哪个是抽象类和接口的正确区别？
  A. 抽象类只能有抽象方法 / B. 接口可以有构造方法 / C. 一个类只能继承一个抽象类但可以实现多个接口 / D. 接口表示 is-a 关系 → C
- `[D20-02]` final 修饰一个引用类型变量后，以下哪个说法正确？
  A. 对象的内容不能修改 / B. 变量的引用地址不能变 / C. 变量不能在方法内修改 / D. 必须在声明时赋值 → B
- `[D20-03]` ArrayList 查询和 LinkedList 查询的时间复杂度分别是？
  A. ArrayList O(n), LinkedList O(1) / B. ArrayList O(1), LinkedList O(n) / C. 都是 O(1) / D. 都是 O(n) → B
- `[D20-04]` HashMap 扩容条件是 size 超过哪个值？
  A. capacity / B. capacity × 0.75 / C. capacity × 0.5 / D. capacity × 1.0 → B
- `[D20-05]` JDK8 ConcurrentHashMap 保证线程安全的方式是？
  A. 方法级 synchronized / B. CAS + synchronized 锁头节点 / C. 分段锁 Segment / D. CopyOnWrite → B
- `[D20-06]` sleep() 和 wait() 的区别，以下哪个说法错误？
  A. sleep 不释放锁，wait 释放锁 / B. sleep 任何地方能调用，wait 只能在同步块中 / C. sleep 到时间自动醒，wait 需要 notify 唤醒 / D. sleep 和 wait 都是 Thread 类的方法 → D
- `[D20-07]` 线程从 RUNNABLE 状态进入 BLOCKED 状态的原因是？
  A. 调用了 sleep() / B. 调用了 Object.wait() / C. 等待获取 synchronized 锁 / D. 调用了 Thread.join() → C
- `[D20-08]` synchronized 可以修饰的位置，以下哪个说法正确？
  A. 只能修饰方法 / B. 实例方法、静态方法、代码块都可以 / C. 只能修饰代码块 / D. 只能修饰静态方法 → B
- `[D20-09]` AQS 使用了什么设计模式？
  A. 单例模式 / B. 观察者模式 / C. 模板方法模式 / D. 工厂模式 → C
- `[D20-10]` MySQL InnoDB 默认的事务隔离级别是？
  A. 读未提交 / B. 读已提交 / C. 可重复读（RR）/ D. 串行化 → C
- `[D20-11]` 以下哪个日志是 MySQL 的"物理日志"，记录"哪个数据页改了什么"？
  A. binlog / B. redo log / C. undo log / D. slow log → B
- `[D20-12]` B+ 树和 B 树的核心区别是？
  A. B+ 树只有叶子节点存数据且有双向链表 / B. B 树更矮 / C. B+ 树不支持范围查询 / D. 两者没有区别 → A
- `[D20-13]` 以下哪种情况会触发回表？
  A. 通过主键查整行 / B. 通过普通索引查 SELECT * / C. 查询字段全部在索引中 / D. 通过主键查部分字段 → B
- `[D20-14]` Redis 缓存穿透的解决方案是？
  A. 增加缓存过期时间 / B. 布隆过滤器 + 缓存空值 / C. 使用分布式锁 / D. 增加副本 → B
- `[D20-15]` Redis 缓存雪崩的解决方案是？
  A. 增加缓存容量 / B. 过期时间加随机值打散 / C. 只用 RDB 持久化 / D. 增加节点 → B
- `[D20-16]` Spring Boot 2.x 默认使用哪种动态代理？
  A. JDK 动态代理（基于接口）/ B. CGLIB（基于继承）/ C. 不使用代理 / D. 随机选择 → B
- `[D20-17]` @SpringBootApplication 等价于以下哪三个注解的组合？
  A. @Configuration + @ComponentScan + @EnableAutoConfiguration / B. @SpringBootConfiguration + @ComponentScan + @EnableAutoConfiguration / C. @BootConfiguration + @BeanScan + @Autowired / D. @SpringBootConfiguration + @EnableWebMvc + @ComponentScan → B
- `[D20-18]` 同一个 Service 类中，方法 A 调用加了 @Transactional 的方法 B，B 的事务是否生效？
  A. 生效 / B. 不生效，因为是 this 调用绕过代理 / C. 取决于 A 是否有事务 / D. 取决于传播级别 → B
- `[D20-19]` SpringCloud Alibaba 中，Gateway 和 Nginx 的正确分工是？
  A. 只用 Gateway 不用 Nginx / B. 客户端 → Nginx（反向代理+负载均衡+SSL）→ Gateway（路由+鉴权+限流）→ 微服务 / C. Nginx 和 Gateway 功能一样选一个就行 / D. Gateway 替代 Nginx 的所有功能 → B
- `[D20-20]` @Transactional 默认对哪种异常回滚？
  A. 所有 Exception / B. 所有 Throwable / C. RuntimeException 和 Error / D. IOException 和 Exception → C

#### 填空题

- `[D20-21]` Java 不支持多继承但支持多____，重写是同名同参不同实现体，重载是同名不同____。 → 实现 / 参数列表
- `[D20-22]` 多态分两种：编译期多态是____（方法名相同参数不同），运行期多态是____（子类对象赋给父类引用）。 → 重载 / 重写
- `[D20-23]` HashMap 底层结构是数组+链表+____，链表长度≥8且数组≥64时转为____树。 → 红黑 / 红黑
- `[D20-24]` HashMap 扩容时，阈值 = 数组容量 × ____（负载因子）。 → 0.75
- `[D20-25]` 数组→List 用 Arrays.asList() 或 new ArrayList<>(Arrays.asList())；List→数组用 ____。 → list.toArray()
- `[D20-26]` 线程 6 种状态：NEW、____、BLOCKED、WAITING、TIMED_WAITING、TERMINATED。 → RUNNABLE
- `[D20-27]` 创建线程的 4 种方式：继承Thread、实现Runnable、实现____（有返回值）、线程池。 → Callable
- `[D20-28]` sleep 是 Thread 的____方法，不释放锁；wait 是 Object 方法，释放锁，需要____/notifyAll 唤醒。 → 静态 / notify
- `[D20-29]` volatile 两个作用：保证____性和禁止指令____。不保证原子性。 → 可见 / 重排序
- `[D20-30]` synchronized 修饰实例方法锁____对象，修饰静态方法锁 Class 对象，修饰代码块锁____对象。 → 当前实例 / 指定
- `[D20-31]` 保证原子性的三种方式：加锁、____类（CAS）、LongAdder。 → 原子（AtomicInteger/AtomicLong）
- `[D20-32]` AQS 的核心公式：AQS = ____ + CLH 队列。ReentrantLock、CountDownLatch、Semaphore 底层都是 AQS。 → CAS
- `[D20-33]` 反射的核心类有：Class、Method、Field、____。反射在 Spring 中用于 IOC 实例化 Bean 和注解处理器。 → Constructor
- `[D20-34]` 设计模式中，AQS 用的是____模式，Spring AOP 用的是____模式，Spring Bean 默认是____模式。 → 模板方法 / 代理 / 单例
- `[D20-35]` Spring IOC 的实现方式是 DI（____注入），通过 @Autowired/@Resource/构造器注入。 → 依赖
- `[D20-36]` SpringBoot 自动配置的三个核心条件注解：@ConditionalOn____、@ConditionalOn____、@ConditionalOn______。 → Class / Property / MissingBean
- `[D20-37]` SpringBoot 相比 Spring 的优势：自动配置、内嵌____、Starter 依赖集合、yml 统一配置。 → Tomcat
- `[D20-38]` @EnableAutoConfiguration 通过 @Import(____) 读取 spring.factories 候选自动配置类。 → AutoConfigurationImportSelector
- `[D20-39]` SpringCloud Alibaba 核心组件：Nacos（注册+配置中心）、Feign（声明式HTTP客户端）、Gateway（网关）、Sentinel（____）、Seata（分布式事务）。 → 限流熔断
- `[D20-40]` RESTful 接口规范：URL 用名词不用动词，用 HTTP 方法表语义，返回语义状态码，统一____格式。 → 响应
- `[D20-41]` InnoDB 引擎的聚簇索引叶子节点存____行数据，非聚簇索引叶子节点存____ ID（需回表）。 → 完整 / 主键
- `[D20-42]` 事务 ACID 四大特性：原子性（____log保证）、一致性、隔离性（MVCC+锁）、持久性（____log保证）。 → undo / redo
- `[D20-43]` MySQL 默认隔离级别可重复读通过 MVCC（快照读）+ ____ lock（当前读）基本消除幻读。 → next-key
- `[D20-44]` MySQL 锁分类：表锁（粒度大并发低）、行锁（锁单行）、____锁（锁间隙防插入）。next-key lock = 行锁 + 间隙锁。 → 间隙
- `[D20-45]` 查询重复数据：SELECT 字段, COUNT(*) FROM 表 GROUP BY 字段 HAVING COUNT(*) __ ____。 → > 1
- `[D20-46]` Redis 五种基本数据结构：String（缓存/计数器/分布式锁）、Hash（对象存储）、List（消息队列）、Set（去重/共同好友）、____（排行榜）。 → ZSet
- `[D20-47]` 缓存穿透是查不存在的数据直接打到数据库；缓存____是热点 key 过期瞬间大量请求打到数据库。 → 击穿

#### 简答题

- `[D20-48]` 请做一个简短的自我介绍，结合过往项目。
  > 面试官您好，我叫姜飞扬，6 年 Java 后端开发经验。我最核心的经验在制造业数字化——参与过裕同智能制造项目，涉及 ERP、MES、WMS、AGV 调度等制造业信息化系统群的集成开发，熟悉从采购计划到生产执行到仓储的全链路业务。后续还做过政企信创项目，涉及国产数据库、中间件适配和低代码平台落地。技术栈 Spring Boot/Cloud、MyBatis、MySQL、Redis、RabbitMQ 都熟悉。汇川在工业自动化方面是行业标杆，我之前的制造业全链路经验跟咱们供应链采购系统的需求比较匹配。
- `[D20-49]` 了解汇川技术吗？
  > 汇川技术是工业自动化龙头上市公司，主要做变频器、伺服、PLC、新能源电驱这些。汇川在制造业信息化方面有大量需求，SRM 供应链采购系统是支撑采购业务的核心系统。
- `[D20-50]` 怎么看待加班、出差？
  > 加班和出差是项目需要，我能接受。之前做 MES 项目上线期间也经常加班，理解项目紧急时期需要投入。
- `[D20-51]` 制造业软件和互联网开发的区别？你更倾向哪个？
  > 我更倾向制造业，因为我有制造业全链路经验这是我的核心优势。区别上：互联网追求高并发、快速迭代、AB 测试；制造业更注重业务流程严谨性、系统集成稳定性、数据追溯完整性。制造业的业务复杂度在流程和集成上，不是流量上。
- `[D20-52]` 面试最后反问环节你会问什么？
  > 1. 咱们供应链采购团队目前的系统架构是什么样的？自研还是基于某个 SRM 产品？2. 入职后最先接触哪个业务模块？3. 团队技术栈和开发模式？
- `[D20-53]` 抽象类和接口的区别？各自表达什么关系？
  > 抽象类可以有构造方法、成员变量、已实现方法；接口只能有常量和抽象方法（JDK8 前）。一个类只能继承一个抽象类，但可以实现多个接口。抽象类表达"is-a"关系，接口表达"has-a"能力。
- `[D20-54]` HashMap put 方法的完整流程是什么？
  > hash 取模定位桶 → 桶为空直接放 → 有元素链表追加（8 个转红黑树）→ size > capacity × 0.75 扩容为 2 倍。JDK8 尾插法（JDK7 头插法多线程会死链）。线程安全用 ConcurrentHashMap。
- `[D20-55]` ArrayList 和 LinkedList 的底层原理和区别？
  > ArrayList 底层 Object 数组，默认 JDK8 懒加载首次 add 才初始化容量 10，扩容 1.5 倍，尾部追加 O(1) 均摊，中间插入 O(n)。LinkedList 底层双向链表，头尾增删 O(1)，中间插入先遍历定位 O(n)，内存不连续对 CPU 缓存不友好。实际项目基本都用 ArrayList。
- `[D20-56]` IO 流了解多少？BIO 和 NIO 的区别？
  > 字节流（InputStream/OutputStream）处理二进制，字符流（Reader/Writer）处理文本。NIO 核心 Selector 多路复用，一个线程管多个连接。BIO 一连接一线程，NIO 适合高并发。
- `[D20-57]` 多线程创建的几种方式？
  > 4 种：① 继承 Thread 重写 run()；② 实现 Runnable 接口传给 Thread；③ 实现 Callable（有返回值，配合 FutureTask）；④ 线程池（生产推荐）。
- `[D20-58]` 多线程存在什么问题？怎么解决？
  > 线程安全问题（竞态条件）、死锁、活锁、线程饥饿。解决：加锁（synchronized/ReentrantLock）、原子类（AtomicInteger/CAS）、线程安全的集合（ConcurrentHashMap）、线程池管理。
- `[D20-59]` 死锁产生的必要条件？如何防止和排查？
  > 四个必要条件：互斥、持有并等待、不可剥夺、循环等待。防止：① 固定加锁顺序破坏循环等待；② tryLock 超时放弃破坏不可剥夺；③ 一次性获取所有锁破坏持有并等待。排查：jps 找进程 → jstack 打印线程栈 → 看 "Found one Java-level deadlock"。
- `[D20-60]` synchronized 和 ReentrantLock 对比？项目里用过什么锁？
  > synchronized 简单好用自动释放，95% 场景够用；ReentrantLock 手动 lock/unlock（必须 finally），支持公平锁、tryLock 超时、可中断、多 Condition。项目里多产线并发用了 ReentrantLock。日常优先 synchronized，需要公平/超时才上 ReentrantLock。
- `[D20-61]` volatile 关键字的作用？
  > 两个作用：① 保证可见性（一个线程修改对其他线程立即可见）；② 禁止指令重排序。不保证原子性——volatile int count 的 count++ 仍然不安全。
- `[D20-62]` 什么能保证操作原子性？
  > ① 加锁（synchronized/ReentrantLock）；② 原子类（AtomicInteger/AtomicLong，底层 CAS）；③ LongAdder（分段累加，高并发性能更好）。
- `[D20-63]` AQS 的原理？AQS 用到的设计模式？
  > AQS = CAS（修改 state 变量）+ CLH 双向队列（排队的线程）。模板方法设计模式——AQS 定义 acquire/release 模板，子类实现 tryAcquire/tryRelease。ReentrantLock、CountDownLatch、Semaphore 底层都是 AQS。
- `[D20-64]` 反射机制了解吗？
  > 运行时获取类的信息（字段、方法、注解）并动态调用。核心类：Class、Method、Field、Constructor。应用场景：Spring IOC 实例化 Bean、MyBatis 映射参数、注解处理器。缺点：破坏封装性、性能差（JDK 有 Inflation 优化：前 15 次 native 反射，之后 ASM 生成字节码）。
- `[D20-65]` 熟悉哪些设计模式？举例说明。
  > ① 单例模式：Spring Bean 默认单例；② 工厂模式：BeanFactory 创建 Bean；③ 代理模式：AOP 动态代理（JDK/CGLIB）；④ 模板方法：AQS；⑤ 策略模式：线程池拒绝策略。这 5 个足够面试。
- `[D20-66]` Spring IOC 是什么？底层原理？
  > IOC 控制反转是一种思想，DI（依赖注入）是实现方式。把对象的创建和依赖关系交给 Spring 容器管理。底层：BeanDefinition 注册 → BeanFactory/ApplicationContext 创建 Bean → 实例化 → 属性赋值 → 初始化（@PostConstruct/InitializingBean）→ 使用 → 销毁。
- `[D20-67]` AOP 是什么？项目中哪些场景用过？
  > 面向切面编程，在不修改业务代码的前提下对方法进行增强。项目中：① 日志记录（记录接口调用参数和耗时）；② 声明式事务（@Transactional 底层就是 AOP）；③ 权限校验。底层：JDK 动态代理或 CGLIB，SpringBoot 2.x 默认 CGLIB。
- `[D20-68]` SpringBoot 启动流程和先后顺序？
  > ① SpringApplication.run() → ② 创建 ApplicationContext → ③ 注册 Banner/Initializer/Listener → ④ 加载自动配置类（@EnableAutoConfiguration → AutoConfigurationImportSelector → 读取 spring.factories → @Conditional 过滤）→ ⑤ 刷新容器（实例化 Bean）→ ⑥ 启动内嵌 Tomcat → ⑦ 发布 ApplicationReadyEvent。
- `[D20-69]` yml 和 properties 配置文件区别？
  > yml 支持层级结构，更易读；properties 是扁平键值对。yml 注意缩进严格，空格不能混用 tab。SpringBoot 两者都支持，优先级 properties > yml（同目录）。
- `[D20-70]` SpringBoot 如何整合 MyBatis、MyBatis-Plus？
  > ① 引入 starter；② 配置 yml（mapper-locations、datasource）；③ @MapperScan 扫描 Mapper 接口；④ Mapper 接口写 SQL（注解或 XML）；⑤ MyBatis-Plus 提供 BaseMapper CRUD 不用写 SQL，Wrapper 构建条件查询。
- `[D20-71]` MySQL 索引是什么？B+ 树原理？B 树和 B+ 树区别？
  > 索引是加速查询的数据结构。B+ 树特点：只有叶子节点存数据，内部节点只存 key；叶子节点双向链表连接，支持范围查询。B 树所有节点都存数据，没有链表连接。B+ 树层级低（3 层约 2000 万条），查询磁盘 I/O 次数固定。
- `[D20-72]` 索引失效常见场景？
  > ① 在索引列上用函数运算；② 隐式类型转换；③ 前导 % 模糊匹配（LIKE '%abc'）；④ 违反最左前缀原则；⑤ OR 条件中有一个列没索引；⑥ 不等于（!=、<>）；⑦ IS NOT NULL（某些情况）。
- `[D20-73]` MySQL 可重复读隔离级别如何解决幻读？
  > RR 本职解决不可重复读。MySQL 的 RR 配合 MVCC（快照读）+ next-key lock（当前读）基本消除幻读。MVCC：每次 select 读 undo log 版本链上的历史版本。当前读通过 next-key lock（记录锁+间隙锁）锁住范围防止插入。
- `[D20-74]` Redis 缓存穿透、击穿、雪崩的解决方案？
  > 穿透：查不存在的数据，用布隆过滤器或缓存空值。击穿：热点 key 过期瞬间，用互斥锁（只让一个线程查库重建）或热点 key 不过期（逻辑过期）。雪崩：大量 key 同时过期，用过期时间加随机值打散、多级缓存、熔断降级。
- `[D20-75]` MQ 消息丢失、重复消费、积压处理思路？
  > 消息丢失三环节：① 生产者 confirm 模式确认到达 Broker；② Broker 持久化（队列+消息）；③ 消费者手动 ACK，处理完业务再确认。重复消费做幂等：数据库唯一索引、Redis SETNX、业务状态判断。消息积压：临时扩容消费者，重度消息落库慢慢处理，排查消费慢的原因。
- `[D20-76]` JVM 运行时数据区怎么划分？垃圾回收怎么做的？
  > 线程私有：程序计数器、虚拟机栈、本地方法栈。线程共享：堆、方法区/元空间。垃圾回收主要回收堆，新生代用复制算法，老年代用标记清除/标记整理。常用收集器 CMS（已废弃，有碎片）和 G1（JDK9 默认，无碎片，可预测停顿）。
- `[D20-77]` SRM 采购全流程是什么？
  > PR（采购申请）→ RFQ（询报价）→ PO（采购订单）→ ASN（发货通知）→ 收货 → 质检 → 三单匹配（PO+收货单+发票金额一致）→ 结算。SRM 管采购协同，供应商通过 SRM 提交报价、确认订单、查看对账。
- `[D20-78]` 三单匹配是什么？为什么需要？
  > 三单匹配 = 采购订单（PO）+ 收货单 + 发票，三单金额一致才付款。作用：防止超付、漏付、重复付，确保采购结算准确。制造业 ERP/SRM 的核心财务控制机制。
- `[D20-79]` 介绍两个核心项目，技术栈、业务亮点。
  > 裕同 MES 项目：Spring Boot + MyBatis + MySQL + Redis + RabbitMQ。负责后端业务接口和系统间数据对接，核心业务包括工单管理、物料齐套校验、质量追溯、MES 与 ERP/WMS 的数据同步。政企信创项目：Spring Cloud Alibaba + 达梦数据库 + 低代码平台。负责国产数据库适配（Oracle/MySQL→达梦迁移）、低代码平台落地、系统集成。
- `[D20-80]` 项目中遇到的难点？如何分析并解决？
  > MES 项目中多系统数据同步不一致的问题。排查思路：查看接口日志发现某次 ERP 推送 MES 失败但没有重试机制。解决方案：① 接口日志全量记录；② 唯一业务单号防重复；③ 增加消息补偿机制（MQ 异步重试 + 对账定时任务 + 人工兜底）。
- `[D20-81]` 日常工作遇到问题，排查解决思路？
  > ① 先看日志定位报错信息；② 看监控（接口 RT、错误率）；③ 复现问题；④ 定位根因；⑤ 修复并验证；⑥ 总结文档化。
- `[D20-82]` SpringData 了解吗？
  > Spring Data 是 Spring 对数据访问的抽象封装，简化数据库操作。Spring Data JPA 自动生成 SQL（Repository 接口不用写实现），Spring Data Redis 封装 Redis 操作。生产项目主要用 MyBatis/MyBatis-Plus，JPA 用得少。
- `[D20-83]` SpringBoot 怎么引入 JS 静态资源？
  > 静态资源默认放在 src/main/resources/static/ 目录下，直接通过 /js/xxx.js 访问。也可以自定义静态资源路径（spring.web.resources.static-locations）。前后端分离项目一般不用 SpringBoot 管前端资源，前端独立部署。
- `[D20-84]` 灰度发布和金丝雀发布是什么？实际项目怎么实现？
  > 都是先小范围验证再全量发布。灰度发布：新版本先给 5% 流量用，没问题再扩大。实现：Nacos + Gateway 配置路由规则，按用户 ID 或 IP 灰度分流。金丝雀发布：同一个概念，名字来自矿井放金丝雀检测有毒气体。先少量请求走新版本观察异常，无异常再全量。

---

## 练习记录

| 日期 | 抽取题号 | 做对 | 部分对 | 不会 | 薄弱知识点 |
|------|---------|------|--------|------|-----------|
| 2026-07-01 | D3-01~03,08, D4-01~02, D5-01~02, D6-01~03, D7-01~02, D8-01~04, D3-02, D4-02, D5-02, D6-02, D7-02, D8-03, D3-03, D5-03, D6-03, D7-03, D8-04 | 8 | 5 | 5 | AQS/CAS底层、隔离级别默认值、ConcurrentHashMap、覆盖索引、线程池快捷方法 |
| 2026-07-02 | D5-02, D6-02, D7-03, D9-01~04, D3-07, D4-05, D6-05, D8-08, D9-05~06, D5-09, D7-09, D9-07~09 | — | — | — | — |

---

## 更新规则

1. **新增题目**：每天复习完毕后，根据当天知识点在对应 Day 的题库下新增题目
2. **生成今日练习**：从所有已复习 Day 的题库中随机抽取 15 题左右（选择 5-7 / 填空 5-6 / 简答 3-4），尽量不重复上一轮
3. **记录成绩**：做完后更新"练习记录"表，标记薄弱知识点
4. **题库增长**：随着复习推进（Day 9→14），题库持续扩大，后期练习覆盖面越来越全
