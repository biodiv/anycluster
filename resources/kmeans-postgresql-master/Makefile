# contrib/kmeans/Makefile

MODULES = kmeans
EXTENSION = $(MODULES)
EXTVERSION = 1.1.0
EXTSQL = $(MODULES)--$(EXTVERSION).sql

DATA_built = $(MODULES).sql
DATA = uninstall_$(MODULES).sql
DOCS = doc/$(MODULES).md
REGRESS = $(MODULES)

SQL_IN = $(MODULES).sql.in
EXTRA_CLEAN = sql/$(MODULES).sql expected/$(MODULES).out

USE_EXTENSION = $(shell pg_config --version | grep -qE " 8\.|9\.0" && echo no || echo yes)

ifeq ($(USE_EXTENSION),yes)
all: $(EXTSQL)

$(EXTSQL): $(EXTENSION).sql
	cp $< $@
DATA = $(EXTSQL)
EXTRA_CLEAN += $(EXTSQL)
endif

PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)
