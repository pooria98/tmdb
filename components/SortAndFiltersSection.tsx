import {
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from "@mantine/core";
import React from "react";
import Filters from "./Filters";
import Sort from "./Sort";

const SortAndFiltersSection = ({
  filterType,
  sortType,
}: {
  filterType: "movies" | "series";
  sortType: "movies" | "series";
}) => {
  return (
    <div className="w-full md:w-80">
      <Accordion
        multiple
        className="w-full"
        variant="separated"
        defaultValue={["sort", "filters"]}
      >
        <AccordionItem value="sort">
          <AccordionControl>
            <p className="font-semibold">Sort</p>
          </AccordionControl>
          <AccordionPanel>
            <Sort sortType={sortType} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="filters">
          <AccordionControl>
            <p className="font-semibold">Filters</p>
          </AccordionControl>
          <AccordionPanel>
            <Filters filterType={filterType} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SortAndFiltersSection;
