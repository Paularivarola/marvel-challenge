import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";

interface PropsGetSorting {
  json: Record<string, unknown>;
  key?: string;
  value?: string;
}

interface AnyEvent {
  target: {
    name: string;
    value: any;
    type: string;
  };
}

const useParamsFilters = () => {
  const [infoPage, setInfoPage] = useState({ page: 1, limit: 10 });
  const { search: locationSearch } = useLocation();
  const params = useMemo(
    () => new URLSearchParams(locationSearch),
    [locationSearch]
  );
  const navigate = useNavigate();
  const sortingKey = useRef<string | null>(null);

  const handleChangeNavigate = (currentFilters: Record<string, any>) =>
    navigate({ search: new URLSearchParams(currentFilters as any).toString() });

  const getSortingKeys = ({ json }: PropsGetSorting): any => {
    if (!json?.sortField) return [];
    return [
      { id: (json as any).sortField, desc: !(json as any).sortDirectionAsc },
    ];
  };

  const removeSortKeysInPlace = (obj: Record<string, unknown>) => {
    const newObj: Record<string, any> = { ...obj };
    for (const key in newObj) {
      if (newObj[`${key}_label`]) delete newObj[`${key}_label`];
    }
    return newObj;
  };

  const copyDeepObj = <T>(data: T): T => {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch {
      return { ...(data as any) };
    }
  };

  const filters = useMemo(() => {
    const f: Record<string, any> = {};
    params.forEach((value, key) => {
      const isBoolean = value === "true" || value === "false";
      const newValue = isBoolean ? value === "true" : value;
      if (!key.includes("label")) f[key] = newValue;
    });
    return f;
  }, [params]);

  const filtersWithLabel = useMemo(() => {
    const f: Record<string, any> = {};
    params.forEach((value, key) => {
      const isBoolean = value === "true" || value === "false";
      f[key] = isBoolean ? value === "true" : value;
    });
    return f;
  }, [params]);

  const filterCount = useMemo(() => {
    const { page, limit, sortDirectionAsc, sortField, ...rest } =
      filters as any;
    return Object.values(rest).length;
  }, [filters]);

  const filterChips = useMemo(() => {
    const chips: Array<{ label: string; name: string; value: any }> = [];
    params.forEach((value, key) => {
      if (key.includes("label")) {
        const labels = value.split(",");
        const name = key.replace("_label", "");
        const base = params.get(name) ?? "";
        const baseValues = base.split(",");
        labels.forEach((label, index) => {
          const raw = baseValues[index];
          const isBoolean = raw === "true" || raw === "false";
          chips.push({
            label,
            name,
            value: isBoolean ? raw === "true" : raw,
          });
        });
      }
    });
    return chips;
  }, [params]);

  const handleAutoSelectEvent = (e: AnyEvent, option: any[]) => {
    const currentFilters: Record<string, any> = { ...filtersWithLabel };
    const { name, value } = e.target;

    const isEmptyArray = Array.isArray(value) && value.length === 0;
    if (isEmptyArray) {
      delete currentFilters[name];
      delete currentFilters[`${name}_label`];
      return handleChangeNavigate(currentFilters);
    }

    const labels = option.map(
      (f) => f?.label || f?.value || f?.name || f?.title || f?.id || ""
    );

    currentFilters[`${name}_label`] = labels;
    currentFilters[name] = value;

    return handleChangeNavigate(currentFilters);
  };

  const handleSingleDataEvent = (
    e: AnyEvent,
    option?: { sorting?: boolean; delete?: boolean }
  ) => {
    let currentFilters: Record<string, any> = { ...filtersWithLabel };
    const { name, value, type } = e.target;

    const hasSomeFilter = Object.keys(currentFilters).some(
      (k) => !["page", "limit"].includes(k)
    );
    if (hasSomeFilter) currentFilters.page = 1;

    if (value === "") {
      delete currentFilters[name];
      if (currentFilters[`${name}_label`])
        delete currentFilters[`${name}_label`];
      return handleChangeNavigate(currentFilters);
    }

    if (type === "date") {
      currentFilters[name] = new Date(value).toISOString();
      currentFilters[`${name}_label`] = name;
    } else if (option?.sorting) {
      if (!option.delete) {
        currentFilters = {
          ...currentFilters,
          sortField: name,
          sortDirectionAsc: value,
        };
      } else {
        const { sortField, sortDirectionAsc, ...deleted } = currentFilters;
        currentFilters = deleted;
      }
    } else {
      currentFilters[name] = value;
      currentFilters[`${name}_label`] = name;
    }

    handleChangeNavigate(currentFilters);
  };

  const handleChangeFilter = (e: AnyEvent, option?: any) => {
    const { type, value } = e.target;
    if (type === "autoselect" && Array.isArray(value))
      return handleAutoSelectEvent(e, option);
    return handleSingleDataEvent(e, option);
  };

  const deleteFilterInUrl = (option: {
    name: string;
    label: string;
    value: string;
  }) => {
    const currentFilters: Record<string, any> = copyDeepObj(filtersWithLabel);
    const { name, label, value } = option;

    const newValues = String(currentFilters[name] ?? "")
      .split(",")
      .filter((item) => item !== value);
    const labels = String(currentFilters[`${name}_label`] ?? "")
      .split(",")
      .filter((item) => item !== label);

    if (newValues.length === 0) {
      delete currentFilters[name];
      delete currentFilters[`${name}_label`];
    } else {
      currentFilters[name] = newValues.join(",");
      currentFilters[`${name}_label`] = labels.join(",");
    }
    currentFilters.page = 1;
    return handleChangeNavigate(currentFilters);
  };

  const deleteAllFilters = () => {
    const currentFilters: Record<string, any> = copyDeepObj(filtersWithLabel);
    if (Object.values(currentFilters).length === 0) return;
    return handleChangeNavigate({});
  };

  const handleSortingChange = (
    newSorting: Array<{ sortField?: string; sortDirectionAsc?: boolean }>
  ) => {
    const id = newSorting[0]?.sortField;
    const order = newSorting[0]?.sortDirectionAsc;
    if (id) sortingKey.current = id;
    const isBoolean = typeof order === "boolean";
    const target: AnyEvent = {
      target: {
        name: id || (sortingKey.current as string),
        value: order,
        type: "text",
      },
    };
    handleChangeFilter(target, { sorting: true, delete: !isBoolean });
  };

  const searchName = (filters as any).name ?? (filters as any).q ?? "";
  const page = Number((filters as any).page ?? infoPage.page) || 1;
  const limit = Number((filters as any).limit ?? infoPage.limit) || 10;
  const offset = (page - 1) * limit;

  const comicVineParams = useMemo(() => {
    const name = String(searchName || "").trim();
    const filter = name ? `name:${name}` : undefined;
    const sort = "name:asc";
    return { filter, sort, limit, offset, name };
  }, [searchName, limit, offset]);

  const setSearchName = (value: string) => {
    const currentFilters: Record<string, any> = {
      ...filtersWithLabel,
      page: 1,
    };
    if (!value.trim()) {
      delete currentFilters.name;
      delete currentFilters.q;
      delete currentFilters["name_label"];
      return handleChangeNavigate(currentFilters);
    }
    currentFilters.name = value.trim();
    currentFilters["name_label"] = "name";
    return handleChangeNavigate(currentFilters);
  };

  return {
    filters,
    infoPage,
    setInfoPage,
    filterCount,
    filterChips,
    handleChangeFilter,
    removeSortKeysInPlace,
    handleSortingChange,
    deleteFilterInUrl,
    deleteAllFilters,
    getSortingKeys,
    comicVineParams,
    setSearchName,
  };
};

export default useParamsFilters;
