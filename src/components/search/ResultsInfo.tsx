interface Props {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  searchQuery: string;
}

export const ResultsInfo = ({ pagination, searchQuery }: Props) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-muted-foreground">
      Found{" "}
      <span className="font-semibold text-foreground">
        {pagination.totalItems.toLocaleString()}
      </span>{" "}
      results
      {searchQuery && (
        <span>
          {" "}
          for "
          <span className="font-medium text-foreground">{searchQuery}</span>"
        </span>
      )}
    </p>
  </div>
);
